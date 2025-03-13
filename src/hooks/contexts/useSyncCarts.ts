import { useEffect } from 'react';
import { CartItem } from '@/types/cart-item';
import useAuthStore from '@/hooks/stores/useAuthStore';
import useAddActiveCartItem from '@/hooks/mutations/active-carts/useAddActiveCartItem';
import useGetActiveCart from '../queries/active-carts/useGetActiveCart';

const useSyncCarts = () => {
	const { authn, authz } = useAuthStore();
	const isClient = authn && authz === 'Client';

	const { mutateAsync: addItem } = useAddActiveCartItem();
	const { data: cart } = useGetActiveCart(isClient);
	const items = cart?.items ?? [];

	useEffect(() => {
		const cartString = localStorage.getItem('cart');

		if (isClient && cartString) {
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
	}, [authn, authz]);
};

export default useSyncCarts;
