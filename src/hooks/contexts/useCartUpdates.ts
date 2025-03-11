import { CartItem } from '@/types/cart-item';
import useAuthStore from '@/hooks/stores/useAuthStore';
import useAddActiveCartItem from '@/hooks/mutations/active-carts/useAddActiveCartItem';
import useRemoveActiveCartItem from '@/hooks/mutations/active-carts/useRemoveActiveCartItem';
import useIncreaseAcitveCartItemQuantity from '@/hooks/mutations/active-carts/useIncreaseAcitveCartItemQuantity';
import useDecreaseAcitveCartItemQuantity from '@/hooks/mutations/active-carts/useDecreaseAcitveCartItemQuantity';
import useToggleActiveCartItemForDelivery from '@/hooks/mutations/active-carts/useToggleActiveCartItemForDelivery';
import useCartContext from './useCartContext';

const useCartUpdates = () => {
	const { authn, authz } = useAuthStore();
	const cartEnabled: boolean = authn && authz === 'Client';

	const { dispatch } = useCartContext();
	const { mutateAsync: addCartItem } = useAddActiveCartItem();
	const { mutateAsync: removeCartItem } = useRemoveActiveCartItem();
	const { mutateAsync: increaseCartItemQuantity } =
		useIncreaseAcitveCartItemQuantity();
	const { mutateAsync: decreaseCartItemQuantity } =
		useDecreaseAcitveCartItemQuantity();
	const { mutateAsync: toggleCartItemForDelivery } =
		useToggleActiveCartItemForDelivery();

	const addItem = async (item: CartItem) => {
		dispatch({ type: 'ADD_ITEM', item: item });

		if (cartEnabled) {
			await addCartItem(item);
		}
	};

	const removeItem = async (id: string) => {
		dispatch({ type: 'REMOVE_ITEM', id: id });

		if (cartEnabled) {
			await removeCartItem({ productId: id });
		}
	};

	const incrementItemQuantity = async (id: string) => {
		dispatch({ type: 'INCREMENT_QUANTITY', id: id });

		if (cartEnabled) {
			await increaseCartItemQuantity({ productId: id, amount: 1 });
		}
	};

	const toggleItemNoDelivery = async (id: string) => {
		dispatch({ type: 'TOGGLE_DELIVERY', id: id });

		if (cartEnabled) {
			await toggleCartItemForDelivery({ productId: id });
		}
	};

	const toggleItemForDelivery = async (
		id: string,
		customizationId: string,
	) => {
		dispatch({ type: 'TOGGLE_DELIVERY', id: id });

		if (cartEnabled) {
			await toggleCartItemForDelivery({
				productId: id,
				customizationId: customizationId,
			});
		}
	};

	const decrementItemQuantity = async (id: string) => {
		dispatch({ type: 'DECREMENT_QUANTITY', id: id });

		if (cartEnabled) {
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

export default useCartUpdates;
