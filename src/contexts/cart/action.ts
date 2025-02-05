import { CartItem } from '@/types/cart-item';

type CartAction =
	| { type: 'FILL_CART'; items: CartItem[] }
	| { type: 'ADD_ITEM'; item: CartItem }
	| { type: 'INCREMENT_QUANTITY'; id: string }
	| { type: 'DECREMENT_QUANTITY'; id: string }
	| { type: 'TOGGLE_DELIVERY'; id: string }
	| { type: 'REMOVE_ITEM'; id: string }
	| { type: 'CLEAR_CART' };

export default CartAction;
