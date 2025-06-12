import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import * as purchasedCarts from '@/api/carts/purchased';
import PurchasedCarts from '@/app/private/customer/carts/all';

export const Route = createFileRoute('/(private)/_customer/carts/')({
	component: () => <PurchasedCarts />,
	validateSearch: z.object({
		limit: z.number().optional(),
		page: z.number().optional(),
		paymentStatus: z.string().optional(),
		sortingDirection: z.string().optional(),
		sortingType: z.string().optional(),
	}),
	loaderDeps: ({ search }) => search,
	loader: async ({
		deps: { limit, page, paymentStatus, sortingDirection, sortingType },
	}) => {
		const { data: carts } = await purchasedCarts.all({
			limit: limit ?? 1,
			page: page ?? 1,
			paymentStatus: paymentStatus ?? undefined,
			sortingDirection: sortingDirection ?? undefined,
			sortingType: sortingType ?? undefined,
		});
		return { carts };
	},
});
