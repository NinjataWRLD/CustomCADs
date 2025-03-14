import { useEffect, useReducer } from 'react';
import { ActiveCartItem } from '@/api/carts/common';
import useAuthStore from '@/hooks/stores/useAuthStore';
import useGetActiveCart from '@/hooks/queries/active-carts/useGetActiveCart';
import useCreateActiveCart from '@/hooks/mutations/active-carts/useCreateActiveCart';
import { CartState } from '@/contexts/cart/context';
import cartReducer from '@/contexts/cart/reducer';
import { CartItem } from '@/types/cart-item';
import isError from '@/utils/is-error';

const useCartInit = (): CartState => {
	const { is } = useAuthStore();
	const { refetch } = useGetActiveCart(false);
	const { mutateAsync: createCart } = useCreateActiveCart();

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
				: {
						forDelivery,
						productId,
						quantity: 1,
					},
		);

	useEffect(() => {
		if (is.client) {
			const initCart = async () => {
				const { data: cart, error } = await refetch();

				if (cart) {
					dispatch({
						type: 'FILL_CART',
						items: mapItems(cart.items),
					});
				} else if (isError(error, 404)) {
					await createCart();
				}
			};
			initCart();
		}
	}, [is]);

	return { items, dispatch };
};

export default useCartInit;
