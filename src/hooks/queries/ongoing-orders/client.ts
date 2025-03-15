import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/orders/ongoing/client/resources/all';
import { Request as Recent } from '@/api/orders/ongoing/client/resources/recent';
import { Request as Single } from '@/api/orders/ongoing/client/resources/single';
import { Request as Caluclate } from '@/api/orders/ongoing/client/resources/calculate-shipment';
import {
	all,
	calculateShipment,
	recent,
	single,
	sortings,
	stats,
} from '@/api/orders/ongoing/client';

export const useGetOngoingOrders = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetOngoingOrder = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export const useGetRecentOngoingOrder = (params: Recent, enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'recent', params],
		queryFn: async () => (await recent(params)).data,
		enabled,
	});

export const useGetOngoingOrdersStats = (enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'stats'],
		queryFn: async () => (await stats()).data,
		enabled,
	});

export const useGetOngoingOrderSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'sortings'],
		queryFn: async () => (await sortings()).data,
		enabled,
	});

export const useCalculateOngoingOrderShipment = (
	params: Caluclate,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: ['ongoing-orders', 'client', 'calculate-shipment', params],
		queryFn: async () => (await calculateShipment(params)).data,
		enabled,
	});
