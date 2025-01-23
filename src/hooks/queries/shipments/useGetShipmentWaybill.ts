import { useQuery } from '@tanstack/react-query';
import { waybill } from '@/api/delivery/shipments/requests';
import { Request } from '@/api/delivery/shipments/types/waybill';

const useGetShipmentWaybill = (params: Request) =>
	useQuery({
		queryKey: ['shipments', 'waybill', params],
		queryFn: async () => (await waybill(params)).data,
	});

export default useGetShipmentWaybill;
