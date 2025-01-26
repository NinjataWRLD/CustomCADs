import { useQuery } from '@tanstack/react-query';
import { reported } from '@/api/orders/ongoing/designer';
import { Request } from '@/api/orders/ongoing/designer/resources/all';

const useGetReportedOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'reported', params],
		queryFn: async () => (await reported(params)).data,
	});

export default useGetReportedOngoingOrders;
