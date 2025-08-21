import { createFileRoute } from '@tanstack/react-router';
import { AppError } from '@/types/errors';
import * as purchasedCartsApi from '@/api/carts/purchased';
import * as customizationsApi from '@/api/printing/customizations';
import PurchasedCartItem from '@/app/private/customer/carts/item';

export const Route = createFileRoute(
	'/(private)/_customer/carts/$id/$productId',
)({
	component: () => <PurchasedCartItem />,
	loader: async ({ params: { id, productId } }) => {
		const { data: cart } = await purchasedCartsApi.single({ id: id });
		const item = cart.items.find((x) => x.productId === productId);

		if (!item) {
			throw new AppError({
				title: 'Item Not Found',
				message: "The Cart Item you're trying to access doesn't exist",
				tip: 'Click on one of the Items from the Carts page',
			});
		}
		if (!item.forDelivery) return { item };

		if (!item.customizationId)
			throw new AppError({
				title: 'No Customization',
				message:
					'The specified Item is for delivery, but has no customization attached to it',
				tip: 'Contact Support for help',
			});

		const { data: customization } = await customizationsApi.single({
			id: item.customizationId,
		});
		return { item, customization };
	},
});
