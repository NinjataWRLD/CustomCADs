import { createFileRoute } from '@tanstack/react-router';
import Product from '@/app/public/product';

export const Route = createFileRoute('/_public/gallery/$id')({
	component: Product,
});
