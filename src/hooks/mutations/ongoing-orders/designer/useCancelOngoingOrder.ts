import { useMutation } from '@tanstack/react-query';
import { cancel } from '@/api/orders/ongoing/designer';
import { Request } from '@/api/orders/ongoing/designer/resources/status';

const useCancelOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'cancel'],
		mutationFn: async (params: Request) => (await cancel(params)).data,
	});

export default useCancelOngoingOrder;
