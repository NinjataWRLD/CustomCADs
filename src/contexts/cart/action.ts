import { CartItem } from '@/types/cart-item';

export type CartAction =
	| { type: 'FILL_CART'; items: CartItem[] }
	| { type: 'ADD_ITEM'; item: CartItem }
	| { type: 'INCREMENT_QUANTITY'; id: string }
	| { type: 'DECREMENT_QUANTITY'; id: string }
	| { type: 'SET_FOR_DELIVERY'; id: string; customizationId: string }
	| { type: 'SET_NO_DELIVERY'; id: string }
	| { type: 'SET_WEIGHT'; id: string; weight: number }
	| { type: 'REMOVE_ITEM'; id: string }
	| { type: 'CLEAR_CART' };
