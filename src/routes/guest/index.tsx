import { RouteObject } from 'react-router-dom';
import PickRole from '@/app/guest/pick-role/page';
import Register from '@/app/guest/register/page';
import Login from '@/app/guest/login/page';

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
