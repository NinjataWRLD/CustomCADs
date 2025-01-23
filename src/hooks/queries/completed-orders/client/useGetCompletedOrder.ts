import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/orders/completed/client/requests';
import { Request } from '@/api/orders/completed/client/types/single';

const useGetCompletedOrder = (params: Request) =>
	useQuery({
		queryKey: ['completed-orders', 'client', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetCompletedOrder;
