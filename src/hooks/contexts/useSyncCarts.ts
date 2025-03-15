import { useEffect } from 'react';
import { CartItem } from '@/types/cart-item';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useAddActiveCartItem } from '@/hooks/mutations/active-carts';
import { useGetActiveCart } from '@/hooks/queries/active-carts';

export const useSyncCarts = () => {
	const { is } = useAuthStore();

	const { mutateAsync: addItem } = useAddActiveCartItem();
	const { data: cart } = useGetActiveCart(is.client);
	const items = cart?.items ?? [];

	useEffect(() => {
		const cartString = localStorage.getItem('cart');

		if (is.client && cartString) {
			localStorage.removeItem('cart');
			const cart = JSON.parse(cartString) as CartItem[];

			const productIds = items.map((i) => i.productId);
			const sync = async () =>
				await Promise.all(
					cart.map((item) => {
						if (!productIds.some((p) => p === item.productId)) {
							return addItem(item);
						}
						return undefined;
					}),
				);
			sync();
		}
	}, [is]);
};
