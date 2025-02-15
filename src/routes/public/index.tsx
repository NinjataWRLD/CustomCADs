import { RouteObject } from 'react-router-dom';
import Home from '@/app/public/home';
import Gallery from '@/app/public/gallery';
import Product from '@/app/public/product';
import Cart from '@/app/public/cart';

const routes: RouteObject[] = [
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
];

export default routes;
