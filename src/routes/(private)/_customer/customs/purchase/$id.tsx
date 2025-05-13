import { createFileRoute } from '@tanstack/react-router';
import PurchaseCustom from '@/app/private/customer/customs/purchase';

export const Route = createFileRoute(
	'/(private)/_customer/customs/purchase/$id',
)({
	component: () => <PurchaseCustom />,
});
