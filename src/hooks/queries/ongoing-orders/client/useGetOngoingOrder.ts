import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/orders/ongoing/client';
import { Request } from '@/api/orders/ongoing/client/resources/single';

const useGetOngoingOrder = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetOngoingOrder;
