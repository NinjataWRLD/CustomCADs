import { createFileRoute } from '@tanstack/react-router';
import Register from '@/app/guest/register';

export const Route = createFileRoute('/_guest/register/$role')({
	component: Register,
});
