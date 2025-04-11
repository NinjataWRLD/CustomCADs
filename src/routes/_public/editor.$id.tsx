import { createFileRoute } from '@tanstack/react-router';
import * as galleryApi from '@/api/catalog/products/gallery';
import Editor from '@/app/public/editor';

export const Route = createFileRoute('/_public/editor/$id')({
	component: Editor,
	loader: async ({ params }) => {
		const { data: product } = await galleryApi.single(params);
		return { product };
	},
});
