import { ReactNode } from 'react';
import CartContext from './context';
import useCartInit from '@/hooks/useCartInit';

const CartProvider = ({ children }: { children: ReactNode }) => {
	const { items, deliveryItems } = useCartInit();

	return (
		<CartContext.Provider value={{ items, deliveryItems }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
