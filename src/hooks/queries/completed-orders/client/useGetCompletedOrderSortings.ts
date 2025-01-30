import { useQuery } from '@tanstack/react-query';
import { sortings } from '@/api/orders/completed/client';

const useGetCompletedOrderSortings = () =>
	useQuery({
		queryKey: ['completed-orders', 'client', 'sortings'],
		queryFn: async () => (await sortings()).data,
	});

export default useGetCompletedOrderSortings;
