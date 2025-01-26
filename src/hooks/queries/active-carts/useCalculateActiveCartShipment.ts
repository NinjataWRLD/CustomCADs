import { useQuery } from '@tanstack/react-query';
import { calculateShipment } from '@/api/carts/active';
import { Request } from '@/api/carts/active/resources/calculate-shipment';

const useCalculateActiveCartShipment = (params: Request) =>
	useQuery({
		queryKey: ['active-carts', 'calculate-shipment', params],
		queryFn: async () => (await calculateShipment(params)).data,
	});

export default useCalculateActiveCartShipment;
