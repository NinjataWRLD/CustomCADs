import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/orders/ongoing/client';
import { Request } from '@/api/orders/ongoing/client/resources/create';

const useCreateOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateOngoingOrder;
