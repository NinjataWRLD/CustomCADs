import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree, context: { auth: undefined! } });
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const Router = () => {
	const auth = useAuthStore();
	return <RouterProvider router={router} context={{ auth }} />;
};

export default Router;
