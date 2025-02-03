import { ReactNode } from 'react';
import CartContext from './context';
import useCartInit from '@/hooks/useCartInit';

const CartProvider = ({ children }: { children: ReactNode }) => {
	const { items } = useCartInit();

	return (
		<CartContext.Provider value={{ items }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
