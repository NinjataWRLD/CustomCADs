import { useQuery } from '@tanstack/react-query';
import { calculateShipment } from '@/api/carts/active/requests';
import { Request } from '@/api/carts/active/types/calculate-shipment';

const useGetActiveCart = (params: Request) =>
	useQuery({
		queryKey: ['active-carts', 'calculate-shipment', params],
		queryFn: async () => (await calculateShipment(params)).data,
	});

export default useGetActiveCart;
