import { RouteObject } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '@/app/app';
import Home from '../app/home/page';

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
	],
};

export default [userRoutes];
