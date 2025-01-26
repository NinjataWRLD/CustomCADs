import { useMutation } from '@tanstack/react-query';
import { finish } from '@/api/orders/ongoing/designer';
import { Request } from '@/api/orders/ongoing/designer/resources/finish';

const useFinishOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'finish'],
		mutationFn: async (params: Request) => (await finish(params)).data,
	});

export default useFinishOngoingOrder;
