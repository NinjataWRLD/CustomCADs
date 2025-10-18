import { createFileRoute, redirect } from '@tanstack/react-router';
import PurchaseCart from '@/app/private/customer/carts/purchase';
import * as activeCartsApi from '@/api/carts/active';

export const Route = createFileRoute('/(private)/_customer/carts/purchase')({
	component: () => <PurchaseCart />,
	beforeLoad: async () => {
		const { data: itemsCount } = await activeCartsApi.count();
		if (!itemsCount) throw redirect({ to: '/gallery' });
	},
});
