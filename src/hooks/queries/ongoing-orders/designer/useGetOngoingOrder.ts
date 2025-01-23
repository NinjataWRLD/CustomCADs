import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/orders/ongoing/designer/requests';
import { Request } from '@/api/orders/ongoing/designer/types/single';

const useGetOngoingOrder = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetOngoingOrder;
