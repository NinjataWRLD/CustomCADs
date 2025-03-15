import { CartItem } from '@/types/cart-item';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
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

		if (is.client) {
			await addCartItem(item);
		}
	};

	const removeItem = async (id: string) => {
		dispatch({ type: 'REMOVE_ITEM', id: id });

		if (is.client) {
			await removeCartItem({ productId: id });
		}
	};

	const incrementItemQuantity = async (id: string) => {
		dispatch({ type: 'INCREMENT_QUANTITY', id: id });

		if (is.client) {
			await increaseCartItemQuantity({ productId: id, amount: 1 });
		}
	};

	const toggleItemNoDelivery = async (id: string) => {
		dispatch({ type: 'SET_NO_DELIVERY', id: id });

		if (is.client) {
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

		if (is.client) {
			await toggleCartItemForDelivery({
				productId: id,
				customizationId: customizationId,
			});
		}
	};

	const decrementItemQuantity = async (id: string) => {
		dispatch({ type: 'DECREMENT_QUANTITY', id: id });

		if (is.client) {
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
