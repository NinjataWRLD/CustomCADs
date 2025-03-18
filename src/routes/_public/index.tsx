import { createFileRoute } from '@tanstack/react-router';
import Home from '@/app/public/home';

export const Route = createFileRoute('/_public/')({
	component: Home,
});
