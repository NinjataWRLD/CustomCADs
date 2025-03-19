import { createFileRoute } from '@tanstack/react-router';
import Login from '@/app/guest/login';

export const Route = createFileRoute('/_guest/login')({
	component: Login,
});
