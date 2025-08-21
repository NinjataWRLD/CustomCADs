import { createContext, Dispatch } from 'react';
import { CartItem } from '@/types/cart-item';
import { CartAction } from './action';

export type CartState = {
	items: CartItem[] | null;
	dispatch: Dispatch<CartAction>;
};
export const defaultValues: CartState = {
	items: [],
	dispatch: () => {},
};

export const CartContext = createContext<CartState>(defaultValues);
