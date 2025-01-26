import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/orders/ongoing/client';
import { Request } from '@/api/orders/ongoing/client/resources/all';

const useGetOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetOngoingOrders;
