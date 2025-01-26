import { useQuery } from '@tanstack/react-query';
import { stats } from '@/api/orders/ongoing/client';

const useGetOngoingOrdersStats = () =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'stats'],
		queryFn: async () => (await stats()).data,
	});

export default useGetOngoingOrdersStats;
