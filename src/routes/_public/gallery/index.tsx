import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import * as galleryApi from '@/api/catalog/products/gallery';
import * as categoriesApi from '@/api/catalog/categories';
import Gallery from '@/app/public/gallery';

export const Route = createFileRoute('/_public/gallery/')({
	component: Gallery,
	validateSearch: z.object({
		name: z.string().optional(),
		categoryName: z.string().optional(),
		sortingType: z.string().optional(),
		sortingDirection: z.string().optional(),
		page: z.number().optional(),
		limit: z.number().optional(),
	}),
	loaderDeps: ({ search }) => ({
		name: search.name,
		categoryName: search.categoryName,
		sortingType: search.sortingType,
		sortingDirection: search.sortingDirection,
		page: search.page ?? 1,
		limit: search.limit ?? 1,
	}),
	loader: async ({ deps }) => {
		const { data: categories } = await categoriesApi.all();
		const category = categories.find((c) => c.name === deps.categoryName);

		const { data: gallery } = await galleryApi.all({
			name: deps.name,
			categoryId: category?.id,
			sortingType: deps.sortingType,
			sortingDirection: deps.sortingDirection,
			page: deps.page,
			limit: deps.limit,
		});
		return { gallery };
	},
});
