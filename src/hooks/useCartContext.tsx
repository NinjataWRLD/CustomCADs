import { useContext } from 'react';
import CartContext from '@/contexts/cart/context';

const useCartContext = () => useContext(CartContext);

export default useCartContext;
