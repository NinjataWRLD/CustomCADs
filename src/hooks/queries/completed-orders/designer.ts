import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/orders/completed/designer/resources/all';
import { Request as Single } from '@/api/orders/completed/designer/resources/single';
import { all, single } from '@/api/orders/completed/designer';

export const useGetCompletedOrders = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['completed-orders', 'designer', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetCompletedOrder = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['completed-orders', 'designer', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});
