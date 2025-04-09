import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import Gallery from '@/app/public/gallery';

export const Route = createFileRoute('/_public/gallery/')({
	component: Gallery,
	validateSearch: z.object({
		name: z.string().optional(),
		categoryName: z.string().optional(),
		sortingType: z.string().optional(),
		sortingDirection: z.string().optional(),
	}),
});
