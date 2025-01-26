import { useQuery } from '@tanstack/react-query';
import { pending } from '@/api/orders/ongoing/designer';
import { Request } from '@/api/orders/ongoing/designer/resources/all';

const useGetPendingOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'pending', params],
		queryFn: async () => (await pending(params)).data,
	});

export default useGetPendingOngoingOrders;
