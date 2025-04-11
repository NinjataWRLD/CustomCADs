import { createFileRoute } from '@tanstack/react-router';
import * as galleryApi from '@/api/catalog/products/gallery';
import Product from '@/app/public/product';

export const Route = createFileRoute('/_public/gallery/$id')({
	component: Product,
	loader: async ({ params }) => {
		const { data: product } = await galleryApi.single(params);
		return { product };
	},
});
