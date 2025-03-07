import { RouteObject } from 'react-router-dom';
import UploadProduct from '@/app/private/creator/upload-product';

const routes: RouteObject[] = [
	{
		path: '/creator/upload',
		element: <UploadProduct />,
	},
];

export default routes;
