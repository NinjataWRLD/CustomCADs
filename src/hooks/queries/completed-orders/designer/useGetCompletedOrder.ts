import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/orders/completed/designer';
import { Request } from '@/api/orders/completed/designer/resources/single';

const useGetCompletedOrder = (params: Request) =>
	useQuery({
		queryKey: ['completed-orders', 'designer', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetCompletedOrder;
