import { useQuery } from '@tanstack/react-query';
import { waybill } from '@/api/delivery/shipments';
import { Request } from '@/api/delivery/shipments/resources/waybill';

const useGetShipmentWaybill = (params: Request) =>
	useQuery({
		queryKey: ['shipments', 'waybill', params],
		queryFn: async () => (await waybill(params)).data,
	});

export default useGetShipmentWaybill;
