import { isAxiosError } from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
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
				<TanStackDevtools
					config={{
						defaultOpen: false,
						hideUntilHover: true,
						openHotkey: ['Shift', 'A'],
						panelLocation: 'bottom',
						position: 'bottom-left',
						theme: 'dark',
						triggerImage:
							'https://tanstack.com/images/logos/logo-color-100.png',
					}}
					plugins={[
						{
							name: 'TanStack Query',
							render: <ReactQueryDevtoolsPanel />,
						},
						{
							name: 'TanStack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
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
