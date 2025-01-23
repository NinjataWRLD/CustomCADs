import { useMutation } from '@tanstack/react-query';
import { begin } from '@/api/orders/ongoing/designer/requests';
import { Request } from '@/api/orders/ongoing/designer/types/begin';

const useBeginOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'begin'],
		mutationFn: async (params: Request) => (await begin(params)).data,
	});

export default useBeginOngoingOrder;
