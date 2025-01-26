import { useQuery } from '@tanstack/react-query';
import { begun } from '@/api/orders/ongoing/designer';
import { Request } from '@/api/orders/ongoing/designer/resources/all';

const useGetBegunOngoingOrders = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'begun', params],
		queryFn: async () => (await begun(params)).data,
	});

export default useGetBegunOngoingOrders;
