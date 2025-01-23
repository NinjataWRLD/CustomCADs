import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/delivery/shipments/requests';
import { Request } from '@/api/delivery/shipments/types/all';

const useGetShipments = (params: Request) =>
	useQuery({
		queryKey: ['shipments', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetShipments;
