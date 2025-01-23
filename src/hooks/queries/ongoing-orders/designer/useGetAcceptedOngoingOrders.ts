import { useQuery } from '@tanstack/react-query';
import { accepted } from '@/api/orders/ongoing/designer/requests';
import { Request } from '@/api/orders/ongoing/designer/types/accepted';

const useGetAcceptedOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'accepted', params],
		queryFn: async () => (await accepted(params)).data,
	});

export default useGetAcceptedOngoingOrders;
