import { isAxiosError } from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppError } from '@/types/errors';
import Layout from '@/app/layout';
import ErrorPage from '@/app/components/state/error';

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
type RouterContext = {};
export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	errorComponent: ({ error }) => {
		if (isAxiosError(error)) {
			switch (error.response?.status) {
				case 400:
					return <ErrorPage status={400} />;
				case 401:
					return <ErrorPage status={401} />;
				case 403:
					return <ErrorPage status={403} />;
				case 404:
					return <ErrorPage status={404} />;
				case undefined:
				default:
					return <ErrorPage status={null} />;
			}
		}

		if (error instanceof AppError) {
			return <ErrorPage status={null} error={error} />;
		}
		return <ErrorPage status={null} />;
	},
	notFoundComponent: () => <ErrorPage status={404} />,
});
