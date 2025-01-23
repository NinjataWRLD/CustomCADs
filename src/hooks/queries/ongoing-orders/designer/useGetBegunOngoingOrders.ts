import { useQuery } from '@tanstack/react-query';
import { begun } from '@/api/orders/ongoing/designer/requests';
import { Request } from '@/api/orders/ongoing/designer/types/begun';

const useGetBegunOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'begun', params],
		queryFn: async () => (await begun(params)).data,
	});

export default useGetBegunOngoingOrders;
