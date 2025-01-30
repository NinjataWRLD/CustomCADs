import { useQuery } from '@tanstack/react-query';
import { sortings } from '@/api/delivery/shipments';

const useGetShipmentSortings = () =>
	useQuery({
		queryKey: ['shipments', 'sortings'],
		queryFn: async () => (await sortings()).data,
	});

export default useGetShipmentSortings;
