import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/orders/completed/designer';
import { Request } from '@/api/orders/completed/designer/resources/all';

const useGetCompletedOrders = (params: Request) =>
	useQuery({
		queryKey: ['completed-orders', 'designer', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetCompletedOrders;
