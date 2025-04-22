import { createFileRoute } from '@tanstack/react-router';
import * as tagsApi from '@/api/catalog/tags';
import * as productsApi from '@/api/catalog/products/gallery';
import Home from '@/app/public/home';

export const Route = createFileRoute('/_public/')({
	component: Home,
	loader: async () => {
		const defaultRes = { products: null };
		try {
			const { data: tags } = await tagsApi.all();
			const popularTag = tags.find((x) => x.name === 'Popular');
			if (!popularTag) {
				return defaultRes;
			}

			const { data: products } = await productsApi.all({
				page: 1,
				limit: 10,
				tagIds: [popularTag.id],
			});
			return { products };
		} catch {
			return defaultRes;
		}
	},
});
