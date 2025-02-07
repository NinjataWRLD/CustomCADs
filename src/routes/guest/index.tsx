import { RouteObject } from 'react-router-dom';
import PickRole from '@/app/guest/pick-role/page';
import Register from '@/app/guest/register/page';

const routes: RouteObject[] = [
	{
		path: '/register',
		element: <PickRole />,
	},
	{
		path: '/register/:role',
		element: <Register />,
	},
];

export default routes;
