import { createFileRoute } from '@tanstack/react-router';
import * as purchasedCartsApi from '@/api/carts/purchased';
import * as customizationsApi from '@/api/customizations/customizations';
import PurchasedCartItem from '@/app/private/customer/carts/item';

export const Route = createFileRoute(
	'/(private)/_customer/carts/$id/$productId',
)({
	component: () => <PurchasedCartItem />,
	loader: async ({ params: { id, productId } }) => {
		const { data: cart } = await purchasedCartsApi.single({ id: id });
		const item = cart.items.find((x) => x.productId === productId);

		if (!item) {
			throw new Error('Item not found');
		}
		if (!item.forDelivery) return { item };

		if (!item.customizationId)
			throw new Error('For delivery but no customization');

		const { data: customization } = await customizationsApi.single({
			id: item.customizationId,
		});
		return { item, customization };
	},
});
