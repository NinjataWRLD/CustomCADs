import { useQuery } from '@tanstack/react-query';
import { calculateShipment } from '@/api/orders/ongoing/client/requests';
import { Request } from '@/api/orders/ongoing/client/types/calculate-shipment';

const useCalculateOngoingOrderShipment = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'calculate-shipment', params],
		queryFn: async () => (await calculateShipment(params)).data,
	});

export default useCalculateOngoingOrderShipment;
