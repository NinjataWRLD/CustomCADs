import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/orders/ongoing/client/requests';
import { Request } from '@/api/orders/ongoing/client/types/create';

const useCreateOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateOngoingOrder;
