import { useMutation } from '@tanstack/react-query';
import { purchase } from '@/api/orders/ongoing/client';
import { Request } from '@/api/orders/ongoing/client/resources/purchase';

const usePurchaseOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'purchase'],
		mutationFn: async (params: Request) => (await purchase(params)).data,
	});

export default usePurchaseOngoingOrder;
