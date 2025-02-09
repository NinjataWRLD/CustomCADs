import { CartItem } from '@/types/cart-item';
import useAuthStore from '@/hooks/stores/useAuthStore';
import useAddActiveCartItem from '@/hooks/mutations/active-carts/useAddActiveCartItem';
import useRemoveActiveCartItem from '@/hooks/mutations/active-carts/useRemoveActiveCartItem';
import useCartInit from './useCartInit';
import useIncreaseAcitveCartItemQuantity from '../mutations/active-carts/useIncreaseAcitveCartItemQuantity';
import useDecreaseAcitveCartItemQuantity from '../mutations/active-carts/useDecreaseAcitveCartItemQuantity';
import useToggleActiveCartItemForDelivery from '../mutations/active-carts/useToggleActiveCartItemForDelivery';

const useCartUpdates = () => {
	const { dispatch } = useCartInit();
	const { authn, authz } = useAuthStore();

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

		if (authn && authz === 'Client') {
			await addCartItem(item);
		}
	};

	const removeItem = async (id: string) => {
		dispatch({ type: 'REMOVE_ITEM', id: id });

		if (authn && authz === 'Client') {
			await removeCartItem({ itemId: id });
		}
	};

	const incrementItemQuantity = async (id: string) => {
		dispatch({ type: 'INCREMENT_QUANTITY', id: id });

		if (authn && authz === 'Client') {
			await increaseCartItemQuantity({ itemId: id, amount: 1 });
		}
	};

	const toggleItemForDelivery = async (id: string) => {
		dispatch({ type: 'TOGGLE_DELIVERY', id: id });

		if (authn && authz === 'Client') {
			await toggleCartItemForDelivery({ itemId: id });
		}
	};

	const decrementItemQuantity = async (id: string) => {
		dispatch({ type: 'DECREMENT_QUANTITY', id: id });

		if (authn && authz === 'Client') {
			await decreaseCartItemQuantity({ itemId: id, amount: 1 });
		}
	};

	return {
		addItem,
		removeItem,
		incrementItemQuantity,
		decrementItemQuantity,
		toggleItemForDelivery,
	};
};

export default useCartUpdates;
