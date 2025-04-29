import { createFileRoute } from '@tanstack/react-router';
import ServicesInfo from '@/app/public/services-info';

export const Route = createFileRoute('/_public/services-info')({
	component: ServicesInfo,
});
