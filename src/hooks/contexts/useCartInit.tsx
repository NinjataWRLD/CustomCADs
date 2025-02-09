import { useEffect, useReducer } from 'react';
import { AxiosError } from 'axios';
import useAuthStore from '@/hooks/stores/useAuthStore';
import useGetActiveCart from '@/hooks/queries/active-carts/useGetActiveCart';
import useCreateActiveCart from '@/hooks/mutations/active-carts/useCreateActiveCart';
import { CartState } from '@/contexts/cart/context';
import cartReducer from '@/contexts/cart/reducer';
import { CartItem } from '@/types/cart-item';

const useCartInit = (): CartState => {
	const { authn } = useAuthStore();
	const { data: cart, isError, error, refetch } = useGetActiveCart();
	const { mutateAsync: createCart } = useCreateActiveCart();

	const loadFromLocalStorage = () => {
		const cart = localStorage.getItem('cart');
		return cart ? (JSON.parse(cart) as CartItem[]) : [];
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
				if (cart) {
					dispatch({ type: 'FILL_CART', items: cart.items });
				} else if (
					isError &&
					error instanceof AxiosError &&
					error.status === 404
				) {
					await createCart();
				}
			};
			initCart();
		}
	}, [authn, cart, isError, refetch]);

	return { items, dispatch };
};

export default useCartInit;
