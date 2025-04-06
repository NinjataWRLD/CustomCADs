import { useEffect, useReducer } from 'react';
import { ActiveCartItem } from '@/api/carts/common';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useGetActiveCartItems } from '@/hooks/queries/active-carts';
import { CartState } from '@/contexts/cart/context';
import { cartReducer } from '@/contexts/cart/reducer';
import { CartItem } from '@/types/cart-item';

export const useCartInit = (): CartState => {
	const { is } = useAuthStore();
	const { refetch } = useGetActiveCartItems(false);

	const loadFromLocalStorage = () => {
		const items = localStorage.getItem('cart');
		return items ? (JSON.parse(items) as CartItem[]) : [];
	};

	const [items, dispatch] = useReducer(cartReducer, [], () =>
		typeof window === 'undefined' ? [] : loadFromLocalStorage(),
	);

	useEffect(() => {
		if (is.guest) {
			localStorage.setItem('cart', JSON.stringify(items));
		}
	}, [items]);

	const mapItems = (items: ActiveCartItem[]): CartItem[] =>
		items.map(({ forDelivery, productId, quantity, customizationId }) =>
			forDelivery
				? {
						forDelivery,
						productId,
						quantity,
						customizationId: customizationId!,
					}
				: { forDelivery, productId, quantity: 1 },
		);

	useEffect(() => {
		if (is.customer) {
			const initCart = async () => {
				const { data: items } = await refetch();

				if (items) {
					dispatch({
						type: 'FILL_CART',
						items: mapItems(items),
					});
				}
			};
			initCart();
		}
	}, [is]);

	return { items, dispatch };
};
