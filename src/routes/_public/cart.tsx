import { createFileRoute } from '@tanstack/react-router';
import Cart from '@/app/public/cart';

export const Route = createFileRoute('/_public/cart')({
	component: Cart,
});
