import { isAxiosError } from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@/app/layout';
import ErrorPage from '@/app/components/state/error/error';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

const RootComponent = () => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Layout />
				<ReactQueryDevtools
					initialIsOpen={false}
					buttonPosition='bottom-right'
					position='right'
				/>
				<TanStackRouterDevtools
					initialIsOpen={false}
					position='bottom-left'
				/>
			</QueryClientProvider>
		</>
	);
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RouterContext {}
export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	errorComponent: ({ error }) => {
		if (isAxiosError(error)) {
			switch (error.response?.status) {
				case 400:
					return <ErrorPage error={{ status: '400' }} />;
				case 401:
					return <ErrorPage error={{ status: '401' }} />;
				case 403:
					return <ErrorPage error={{ status: '403' }} />;
				case 404:
					return <ErrorPage error={{ status: '404' }} />;
				case undefined:
				default:
					return <ErrorPage error={{ status: 'default' }} />;
			}
		}
		return <ErrorPage error={{ status: 'default' }} />;
	},
	notFoundComponent: () => <ErrorPage error={{ status: '404' }} />,
});
