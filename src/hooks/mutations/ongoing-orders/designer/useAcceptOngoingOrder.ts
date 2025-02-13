import { useMutation } from '@tanstack/react-query';
import { accept } from '@/api/orders/ongoing/designer';
import { Request } from '@/api/orders/ongoing/designer/resources/status';

const useAcceptOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'accept'],
		mutationFn: async (params: Request) => (await accept(params)).data,
	});

export default useAcceptOngoingOrder;
