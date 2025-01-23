import { useMutation } from '@tanstack/react-query';
import { cancel } from '@/api/orders/ongoing/designer/requests';
import { Request } from '@/api/orders/ongoing/designer/types/cancel';

const useCancelOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'cancel'],
		mutationFn: async (params: Request) => (await cancel(params)).data,
	});

export default useCancelOngoingOrder;
