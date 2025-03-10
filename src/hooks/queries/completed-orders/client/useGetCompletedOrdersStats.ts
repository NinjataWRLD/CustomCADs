import { useQuery } from '@tanstack/react-query';
import { stats } from '@/api/orders/completed/client';

const useGetCompletedOrdersStats = () =>
	useQuery({
		queryKey: ['completed-orders', 'client', 'stats'],
		queryFn: async () => (await stats()).data,
	});

export default useGetCompletedOrdersStats;
