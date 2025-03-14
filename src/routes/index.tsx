import { RouteObject } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/app/layout';
import CartContextProvider from '@/contexts/cart/provider';
import publicRoutes from './public';
import guestRoutes from './guest';
import creatorRoutes from './creator';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

const userRoutes: RouteObject = {
	path: '/',
	element: (
		<QueryClientProvider client={queryClient}>
			<CartContextProvider>
				<Layout />
			</CartContextProvider>
		</QueryClientProvider>
	),
	children: [...publicRoutes, ...guestRoutes, ...creatorRoutes],
};

export default [userRoutes];
