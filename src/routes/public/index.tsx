import Home from '@/app/public/home/page';
import Gallery from '@/app/public/gallery/page';
import Product from '@/app/public/product/page';
import Cart from '@/app/public/cart/page';

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
	{
		path: '/cart',
		element: <Cart />,
	},
];

export default routes;
