import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import Layout from '@/app/layout';

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

interface RouterContext {
	auth: ReturnType<typeof useAuthStore>;
}
export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
});
