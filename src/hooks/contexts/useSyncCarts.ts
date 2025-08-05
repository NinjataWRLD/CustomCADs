import { useEffect } from 'react';
import { CartItem } from '@/types/cart-item';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useAddActiveCartItem } from '@/hooks/mutations/active-carts';
import { useGetActiveCartItems } from '@/hooks/queries/active-carts';

export const useSyncCarts = () => {
	const { is } = useAuthStore();
	const { idempotencyKeys } = useIdempotencyKeys(['add'] as const);

	const { mutateAsync: addItem } = useAddActiveCartItem();
	const { data: items } = useGetActiveCartItems(is.customer);

	useEffect(() => {
		const cartString = localStorage.getItem('cart');

		if (is.customer && cartString) {
			localStorage.removeItem('cart');
			const cart = JSON.parse(cartString) as CartItem[];

			const productIds = (items ?? []).map((i) => i.productId);
			const sync = async () =>
				await Promise.all(
					cart.map((item) => {
						if (!productIds.some((p) => p === item.productId)) {
							return addItem({
								idempotencyKey: idempotencyKeys.add,
								...item,
							});
						}
						return undefined;
					}),
				);
			sync();
		}
	}, [is]);
};
