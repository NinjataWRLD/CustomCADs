import { createFileRoute } from '@tanstack/react-router';
import PurchaseCart from '@/app/private/customer/carts/purchase';

export const Route = createFileRoute('/(private)/_customer/carts/purchase/')({
	component: () => <PurchaseCart />,
});
