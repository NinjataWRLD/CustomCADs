import { useQuery } from '@tanstack/react-query';
import { pending } from '@/api/orders/ongoing/designer/requests';
import { Request } from '@/api/orders/ongoing/designer/types/pending';

const useGetPendingOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'pending', params],
		queryFn: async () => (await pending(params)).data,
	});

export default useGetPendingOngoingOrders;
