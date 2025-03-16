import { RouteObject } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@/app/layout';
import { CartProvider } from '@/contexts/cart/provider';
import { routes as publicRoutes } from './public';
import { routes as guestRoutes } from './guest';
import { routes as creatorRoutes } from './creator';

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
			<CartProvider>
				<Layout />
			</CartProvider>
			<ReactQueryDevtools
				initialIsOpen={false}
				buttonPosition='bottom-right'
				position='right'
			/>
		</QueryClientProvider>
	),
	children: [publicRoutes, guestRoutes, creatorRoutes],
};

export const routes = [userRoutes];
