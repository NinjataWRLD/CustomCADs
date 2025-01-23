import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/orders/ongoing/client/requests';
import { Request } from '@/api/orders/ongoing/client/types/all';

const useGetOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetOngoingOrders;
