import { ReactNode } from 'react';
import { CartContext } from './context';
import { useCartInit } from '@/hooks/contexts/useCartInit';

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const { items, dispatch } = useCartInit();

	return (
		<CartContext.Provider value={{ items, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};
