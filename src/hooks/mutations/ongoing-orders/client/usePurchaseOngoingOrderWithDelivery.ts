import { useMutation } from '@tanstack/react-query';
import { purchaseWithDelivery } from '@/api/orders/ongoing/client/requests';
import { Request } from '@/api/orders/ongoing/client/types/purchase-delivery';

const usePurchaseOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'purchase-delivery'],
		mutationFn: async (params: Request) =>
			(await purchaseWithDelivery(params)).data,
	});

export default usePurchaseOngoingOrder;
