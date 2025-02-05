import { createContext, Dispatch } from 'react';
import { CartItem } from '@/types/cart-item';
import CartAction from './action';

export interface CartState {
	items: CartItem[];
	dispatch: Dispatch<CartAction>;
}
export const defaultValues: CartState = {
	items: [],
	dispatch: () => {},
};

const CartContext = createContext<CartState>(defaultValues);
export default CartContext;
