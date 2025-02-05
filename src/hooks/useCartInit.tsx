import { useEffect, useReducer } from 'react';
import { AxiosError } from 'axios';
import useAuthn from '@/hooks/queries/identity/useAuthn';
import useGetActiveCart from '@/hooks/queries/active-carts/useGetActiveCart';
import useCreateActiveCart from '@/hooks/mutations/active-carts/useCreateActiveCart';
import { CartState } from '@/contexts/cart/context';
import cartReducer from '@/contexts/cart/reducer';
import { CartItem } from '@/types/cart-item';

const useCartInit = (): CartState => {
	const { data: authn } = useAuthn();
	const { data: cart, isError, error, refetch } = useGetActiveCart();
	const { mutate: createCart } = useCreateActiveCart();

	const init = () => {
		if (typeof window === 'undefined') {
			return [];
		}

		const cartString = localStorage.getItem('cart');
		if (!cartString) {
			return [];
		}

		const items: CartItem[] = JSON.parse(cartString);
		return items;
	};
	const [items, dispatch] = useReducer(cartReducer, [], init);

	useEffect(() => {
		if (authn === false) {
			localStorage.setItem('cart', JSON.stringify(items));
		}
	}, [authn, items]);

	useEffect(() => {
		if (authn === true) {
			if (cart) {
				const { items } = cart;
				dispatch({ type: 'FILL_CART', items: items });
			} else if (
				isError &&
				error instanceof AxiosError &&
				error.status === 404
			) {
				createCart();
				refetch();
			}
		}
	}, [authn, cart, createCart, error, isError, refetch]);

	return { items, dispatch };
};

export default useCartInit;
