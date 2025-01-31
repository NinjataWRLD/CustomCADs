import { RouteObject } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '@/app/app';
import Home from '../app/home/page';
import Gallery from '@/app/gallery/page';
import Product from '@/app/product/page';

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
			<App />
		</QueryClientProvider>
	),
	children: [
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/gallery',
			element: <Gallery />,
		},
		{
			path: '/gallery/:id',
			element: <Product />,
		},
	],
};

export default [userRoutes];
