import { RouteObject } from 'react-router-dom';
import Home from '@/app/public/home';
import Gallery from '@/app/public/gallery';
import Product from '@/app/public/product';
import Cart from '@/app/public/cart';
import Editor from '@/app/public/editor';
import PublicGuard from './guards/public-guard';

const routes: RouteObject = {
	element: <PublicGuard />,
	children: [
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/gallery',
			element: <Gallery />,
		},
		{
			path: '/gallery/:id',
			element: <Product />,
		},
		{
			path: '/cart',
			element: <Cart />,
		},
		{
			path: '/editor/:id',
			element: <Editor />,
		},
	],
};

export default routes;
