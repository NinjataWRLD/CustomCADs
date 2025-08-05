import { CartItem } from '@/types/cart-item';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import {
	useAddActiveCartItem,
	useToggleActiveCartItemForDelivery,
	useRemoveActiveCartItem,
	useIncreaseActiveCartItemQuantity,
	useDecreaseActiveCartItemQuantity,
} from '@/hooks/mutations/active-carts';
import { useCartContext } from './useCartContext';

export const useCartUpdates = () => {
	const { is } = useAuthStore();
	const { idempotencyKeys } = useIdempotencyKeys(['add']);

	const { dispatch } = useCartContext();
	const { mutateAsync: addCartItem } = useAddActiveCartItem();
	const { mutateAsync: removeCartItem } = useRemoveActiveCartItem();
	const { mutateAsync: increaseCartItemQuantity } =
		useIncreaseActiveCartItemQuantity();
	const { mutateAsync: decreaseCartItemQuantity } =
		useDecreaseActiveCartItemQuantity();
	const { mutateAsync: toggleCartItemForDelivery } =
		useToggleActiveCartItemForDelivery();

	const addItem = async (item: CartItem) => {
		dispatch({ type: 'ADD_ITEM', item: item });

		if (is.customer) {
			await addCartItem({ idempotencyKey: idempotencyKeys.add, ...item });
		}
	};

	const removeItem = async (id: string) => {
		dispatch({ type: 'REMOVE_ITEM', id: id });

		if (is.customer) {
			await removeCartItem({ productId: id });
		}
	};

	const incrementItemQuantity = async (id: string) => {
		dispatch({ type: 'INCREMENT_QUANTITY', id: id });

		if (is.customer) {
			await increaseCartItemQuantity({ productId: id, amount: 1 });
		}
	};

	const toggleItemNoDelivery = async (id: string) => {
		dispatch({ type: 'SET_NO_DELIVERY', id: id });

		if (is.customer) {
			await toggleCartItemForDelivery({ productId: id });
		}
	};

	const toggleItemForDelivery = async (
		id: string,
		customizationId: string,
	) => {
		dispatch({
			type: 'SET_FOR_DELIVERY',
			id: id,
			customizationId: customizationId,
		});

		if (is.customer) {
			await toggleCartItemForDelivery({
				productId: id,
				customizationId: customizationId,
			});
		}
	};

	const decrementItemQuantity = async (id: string) => {
		dispatch({ type: 'DECREMENT_QUANTITY', id: id });

		if (is.customer) {
			await decreaseCartItemQuantity({ productId: id, amount: 1 });
		}
	};

	return {
		addItem,
		removeItem,
		incrementItemQuantity,
		decrementItemQuantity,
		toggleItemNoDelivery,
		toggleItemForDelivery,
	};
};
