import { useMutation } from '@tanstack/react-query';
import { purchaseWithDelivery } from '@/api/orders/ongoing/client';
import { Request } from '@/api/orders/ongoing/client/resources/purchase-delivery';

const usePurchaseOngoingOrderWithDelivery = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'purchase-delivery'],
		mutationFn: async (params: Request) =>
			(await purchaseWithDelivery(params)).data,
	});

export default usePurchaseOngoingOrderWithDelivery;
