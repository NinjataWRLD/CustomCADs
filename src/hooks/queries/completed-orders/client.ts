import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/orders/completed/client/resources/all';
import { Request as Single } from '@/api/orders/completed/client/resources/single';
import { Request as Download } from '@/api/orders/completed/client/resources/download';
import {
	all,
	downloadCad,
	single,
	sortings,
	stats,
} from '@/api/orders/completed/client';

export const useGetCompletedOrders = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['completed-orders', 'client', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetCompletedOrder = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['completed-orders', 'client', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export const useGetCompletedOrdersStats = (enabled?: boolean) =>
	useQuery({
		queryKey: ['completed-orders', 'client', 'stats'],
		queryFn: async () => (await stats()).data,
		enabled,
	});

export const useGetCompletedOrderSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: ['completed-orders', 'client', 'sortings'],
		queryFn: async () => (await sortings()).data,
		enabled,
	});

export const useDownloadCompletedOrderCad = (
	params: Download,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: ['completed-orders', 'client', 'download-cad', params],
		queryFn: async () => (await downloadCad(params)).data,
		enabled,
	});
