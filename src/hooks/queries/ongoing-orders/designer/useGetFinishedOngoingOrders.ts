import { useQuery } from '@tanstack/react-query';
import { finished } from '@/api/orders/ongoing/designer/requests';
import { Request } from '@/api/orders/ongoing/designer/types/finished';

const useGetFinishedOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'finished', params],
		queryFn: async () => (await finished(params)).data,
	});

export default useGetFinishedOngoingOrders;
