import { RouteObject } from 'react-router-dom';
import PickRole from '@/app/guest/pick-role/page';
import Register from '@/app/guest/register/page';
import Login from '@/app/guest/login/page';
import ForgotPassword from '@/app/guest/forgot-password/page';
import ResetPassword from '@/app/guest/reset-password/page';

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
	{
		path: '/forgot-password',
		element: <ForgotPassword />,
	},
	{
		path: '/reset-password',
		element: <ResetPassword />,
	},
];

export default routes;
