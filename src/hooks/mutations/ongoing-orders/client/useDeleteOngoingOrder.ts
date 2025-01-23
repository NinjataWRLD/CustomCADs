import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/orders/ongoing/client/requests';
import { Request } from '@/api/orders/ongoing/client/types/delete';

const useDeleteOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteOngoingOrder;
