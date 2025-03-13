import { useEffect, useReducer } from 'react';
import useAuthStore from '@/hooks/stores/useAuthStore';
import useGetActiveCart from '@/hooks/queries/active-carts/useGetActiveCart';
import useCreateActiveCart from '@/hooks/mutations/active-carts/useCreateActiveCart';
import { CartState } from '@/contexts/cart/context';
import cartReducer from '@/contexts/cart/reducer';
import { CartItem } from '@/types/cart-item';
import isError from '@/utils/is-error';

const useCartInit = (): CartState => {
	const { authn } = useAuthStore();
	const { refetch } = useGetActiveCart();
	const { mutateAsync: createCart } = useCreateActiveCart();

	const loadFromLocalStorage = () => {
		const items = localStorage.getItem('cart');
		return items ? (JSON.parse(items) as CartItem[]) : [];
	};

	const [items, dispatch] = useReducer(cartReducer, [], () =>
		typeof window === 'undefined' ? [] : loadFromLocalStorage(),
	);

	useEffect(() => {
		if (authn === false) {
			localStorage.setItem('cart', JSON.stringify(items));
		}
	}, [items]);

	useEffect(() => {
		if (authn === true) {
			const initCart = async () => {
				const { data: cart, error } = await refetch();

				if (cart) {
					dispatch({ type: 'FILL_CART', items: cart.items });
				} else if (isError(error, 404)) {
					await createCart();
				}
			};
			initCart();
		}
	}, [authn]);

	return { items, dispatch };
};

export default useCartInit;
