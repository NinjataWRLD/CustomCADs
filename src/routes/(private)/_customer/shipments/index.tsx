import z from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import * as shipmentsApi from '@/api/delivery/shipments';

export const Route = createFileRoute('/(private)/_customer/shipments/')({
	component: () => {},
	validateSearch: z.object({
		sortingType: z.string().optional(),
		sortingDirection: z.string().optional(),
		page: z.number().optional(),
		limit: z.number().optional(),
	}),
	loaderDeps: ({ search }) => ({
		sortingType: search.sortingType,
		sortingDirection: search.sortingDirection,
		page: search.page ?? 1,
		limit: search.limit ?? 1,
	}),
	loader: async ({ deps }) => {
		const { data: shipments } = await shipmentsApi.all(deps);
		return { shipments };
	},
});
