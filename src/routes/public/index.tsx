import Home from '@/app/public/home/page';
import Gallery from '@/app/public/gallery/page';
import Product from '@/app/public/product/page';

const routes = [
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
];

export default routes;
