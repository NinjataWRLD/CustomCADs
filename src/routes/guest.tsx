import { RouteObject } from 'react-router-dom';
import PickRole from '@/app/guest/pick-role';
import Register from '@/app/guest/register';
import Login from '@/app/guest/login';
import ForgotPassword from '@/app/guest/forgot-password';
import ResetPassword from '@/app/guest/reset-password';
import GuestGuard from './guards/guest-guard';

const routes: RouteObject = {
	element: <GuestGuard />,
	children: [
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
	],
};

export default routes;
