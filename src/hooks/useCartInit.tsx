import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import useAuthn from '@/hooks/queries/identity/useAuthn';
import useGetActiveCart from '@/hooks/queries/active-carts/useGetActiveCart';
import useCreateActiveCart from '@/hooks/mutations/active-carts/useCreateActiveCart';
import { CartState, defaultValues } from '@/contexts/cart/context';

const useCartInit = () => {
	const [items, setItems] = useState(defaultValues.items);
	const [deliveryItems, setDeliveryItems] = useState(
		defaultValues.deliveryItems,
	);

	const { data: authn } = useAuthn();
	const { data: cart, isError, error } = useGetActiveCart();
	const { mutate: createCart } = useCreateActiveCart();

	useEffect(() => {
		const initUserCart = () => {
			if (cart) {
				const { items } = cart;
				setItems(items.filter((i) => !i.forDelivery));
				setDeliveryItems(items.filter((i) => i.forDelivery));
			} else if (
				isError &&
				error instanceof AxiosError &&
				error.status === 404
			) {
				createCart();
			}
		};
		const initGuestCart = () => {
			const persistEmptyCart = () => {
				localStorage.setItem('cart', JSON.stringify(defaultValues));
			};
			try {
				const cartString = localStorage.getItem('cart');
				if (cartString) {
					const cart: CartState = JSON.parse(cartString);
					setItems(cart.items);
					setDeliveryItems(cart.deliveryItems);
				} else {
					persistEmptyCart();
				}
			} catch {
				persistEmptyCart();
			}
		};

		const initCart = () => {
			if (authn === true) {
				initUserCart();
			} else if (authn === false) {
				initGuestCart();
			}
		};
		initCart();
	}, [authn, cart, createCart, error, isError]);

	return { items, deliveryItems };
};

export default useCartInit;
