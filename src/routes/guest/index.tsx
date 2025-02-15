import { RouteObject } from 'react-router-dom';
import PickRole from '@/app/guest/pick-role';
import Register from '@/app/guest/register';
import Login from '@/app/guest/login';

const routes: RouteObject[] = [
	{
		path: '/register',
		element: <PickRole />,
	},
	{
		path: '/register/:role',
		element: <Register />,
	},
	{
		path: '/login',
		element: <Login />,
	},
];

export default routes;
