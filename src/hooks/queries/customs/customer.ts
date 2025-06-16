import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/customs/customs/customer/all';
import { Request as Recent } from '@/api/customs/customs/customer/recent';
import { Request as Single } from '@/api/customs/customs/customer/single';
import { Request as Caluclate } from '@/api/customs/customs/customer/calculate-shipment';
import { Request as Download } from '@/api/customs/customs/customer/download';
import {
	all,
	calculateShipment,
	download,
	paymentStatuses,
	recent,
	single,
	sortings,
	stats,
} from '@/api/customs/customs/customer';

export const useGetCustoms = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'customer', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetCustom = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'customer', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export const useGetRecentCustom = (params: Recent, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'customer', 'recent', params],
		queryFn: async () => (await recent(params)).data,
		enabled,
	});

export const useGetCustomsStats = (enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'customer', 'stats'],
		queryFn: async () => (await stats()).data,
		enabled,
	});

export const useGetCustomSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'customer', 'sortings'],
		queryFn: async () => (await sortings()).data,
		enabled,
	});

export const useGetCustomPaymentStatuses = (enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'customer', 'payment-statuses'],
		queryFn: async () => (await paymentStatuses()).data,
		enabled,
	});

export const useCalculateCustomShipment = (
	params: Caluclate,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: ['customs', 'customer', 'calculate-shipment', params],
		queryFn: async () => (await calculateShipment(params)).data,
		enabled,
	});

export const useDownloadCustomCad = (params: Download, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'customer', 'download-cad', params],
		queryFn: async () => (await download(params)).data,
		enabled,
	});
