import { RouteObject } from 'react-router-dom';
import PickRole from '@/app/guest/pick-role/page';

const routes: RouteObject[] = [
	{
		path: '/register',
		element: <PickRole />,
	},
];

export default routes;
