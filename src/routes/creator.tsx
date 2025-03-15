import { RouteObject } from 'react-router-dom';
import UploadProduct from '@/app/private/creator/upload-product';
import CreatorGuard from './guards/creator-guard';

export const routes: RouteObject = {
	element: <CreatorGuard />,
	children: [
		{
			path: '/creator/upload',
			element: <UploadProduct />,
		},
	],
};
