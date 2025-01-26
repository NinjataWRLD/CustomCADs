import { useQuery } from '@tanstack/react-query';
import { finished } from '@/api/orders/ongoing/designer';
import { Request } from '@/api/orders/ongoing/designer/resources/all';

const useGetFinishedOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'finished', params],
		queryFn: async () => (await finished(params)).data,
	});

export default useGetFinishedOngoingOrders;
