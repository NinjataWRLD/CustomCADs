import { useQuery } from '@tanstack/react-query';
import { accepted } from '@/api/orders/ongoing/designer';
import { Request } from '@/api/orders/ongoing/designer/resources/all';

const useGetAcceptedOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'accepted', params],
		queryFn: async () => (await accepted(params)).data,
	});

export default useGetAcceptedOngoingOrders;
