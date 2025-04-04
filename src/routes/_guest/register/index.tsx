import { createFileRoute } from '@tanstack/react-router';
import PickRole from '@/app/guest/pick-role';

export const Route = createFileRoute('/_guest/register/')({
	component: PickRole,
});
