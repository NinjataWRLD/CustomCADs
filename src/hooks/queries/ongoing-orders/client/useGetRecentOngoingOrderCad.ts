import { useQuery } from '@tanstack/react-query';
import { recent } from '@/api/orders/ongoing/client/requests';
import { Request } from '@/api/orders/ongoing/client/types/recent';

const useGetRecentOngoingOrder = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'recent', params],
		queryFn: async () => (await recent(params)).data,
	});

export default useGetRecentOngoingOrder;
