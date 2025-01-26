import { useMutation } from '@tanstack/react-query';
import { begin } from '@/api/orders/ongoing/designer';
import { Request } from '@/api/orders/ongoing/designer/resources/status';

const useBeginOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'begin'],
		mutationFn: async (params: Request) => (await begin(params)).data,
	});

export default useBeginOngoingOrder;
