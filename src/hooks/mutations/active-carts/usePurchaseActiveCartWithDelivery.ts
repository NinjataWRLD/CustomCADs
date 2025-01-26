import { useMutation } from '@tanstack/react-query';
import { purchaseWithDelivery } from '@/api/carts/active';
import { Request } from '@/api/carts/active/resources/purchase-delivery';

const usePurchaseActiveCartWithDelivery = () =>
	useMutation({
		mutationKey: ['active-carts', 'purchase-delivery'],
		mutationFn: async (req: Request) =>
			(await purchaseWithDelivery(req)).data,
	});

export default usePurchaseActiveCartWithDelivery;
