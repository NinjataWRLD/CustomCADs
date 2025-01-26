import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/delivery/shipments';
import { Request } from '@/api/delivery/shipments/resources/all';

const useGetShipments = (params: Request) =>
	useQuery({
		queryKey: ['shipments', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetShipments;
