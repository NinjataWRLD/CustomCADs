import { CartItem } from '@/types/cart-item';
import CartAction from './action';

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
	switch (action.type) {
		case 'ADD_ITEM':
			return state.find(
				(item) => item.productId === action.item.productId,
			)
				? state
				: [...state, action.item];
		case 'INCREMENT_QUANTITY':
			return state.map((item) =>
				item.productId === action.id
					? { ...item, quantity: item.quantity + 1 }
					: item,
			);
		case 'DECREMENT_QUANTITY':
			return state.map((item) =>
				item.productId === action.id && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item,
			);
		case 'TOGGLE_DELIVERY':
			return state.map((item) =>
				item.productId === action.id
					? { ...item, forDelivery: !item.forDelivery }
					: item,
			);
		case 'SET_WEIGHT':
			return state.map((item) =>
				item.productId === action.id
					? { ...item, weight: action.weight }
					: item,
			);
		case 'FILL_CART':
			return action.items;
		case 'REMOVE_ITEM':
			return state.filter((item) => item.productId !== action.id);
		case 'CLEAR_CART':
			return [];
		default:
			return state;
	}
};

export default cartReducer;
