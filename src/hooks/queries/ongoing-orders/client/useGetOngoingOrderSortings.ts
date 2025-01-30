import { useQuery } from '@tanstack/react-query';
import { sortings } from '@/api/orders/ongoing/client';

const useGetOngoingOrderSortings = () =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'sortings'],
		queryFn: async () => (await sortings()).data,
	});

export default useGetOngoingOrderSortings;
