import { createContext } from 'react';
import { CartItem } from '@/types/cart-item';

export interface CartState {
	items: CartItem[];
}
export const defaultValues: CartState = {
	items: [],
};

const CartContext = createContext<CartState>(defaultValues);
export default CartContext;
