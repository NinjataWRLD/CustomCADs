import { useContext } from 'react';
import { CartContext } from '@/contexts/cart/context';

export const useCartContext = () => useContext(CartContext);
