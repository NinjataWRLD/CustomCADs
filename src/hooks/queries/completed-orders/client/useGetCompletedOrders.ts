import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/orders/completed/client/requests';
import { Request } from '@/api/orders/completed/client/types/all';

const useGetCompletedOrders = (params: Request) =>
	useQuery({
		queryKey: ['completed-orders', 'client', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetCompletedOrders;
