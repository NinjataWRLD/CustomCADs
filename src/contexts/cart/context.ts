import { createContext } from 'react';
import { CartDeliveryItem, CartItem } from '@/types/cart-item';

export interface CartState {
	items: CartItem[];
	deliveryItems: CartDeliveryItem[];
}
export const defaultValues: CartState = {
	items: [],
	deliveryItems: [],
};

const CartContext = createContext<CartState>(defaultValues);
export default CartContext;
