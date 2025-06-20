import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/customs/customs/customer/all';
import { Request as Recent } from '@/api/customs/customs/customer/recent';
import { Request as Single } from '@/api/customs/customs/customer/single';
import { Request as Calculate } from '@/api/customs/customs/customer/calculate-shipment';
import { Request as Download } from '@/api/customs/customs/customer/download';
import * as api from '@/api/customs/customs/customer';

export const keys = {
	base: ['customs', 'customer'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
	recent: (params: Recent) => [...keys.base, 'recent', params] as const,
	stats: () => [...keys.base, 'stats'] as const,
	sortings: () => [...keys.base, 'sortings'] as const,
	paymentStatuses: () => [...keys.base, 'payment-statuses'] as const,
	calculateShipment: (params: Calculate) =>
		[...keys.base, 'calculate-shipment', params] as const,
	download: (params: Download) =>
		[...keys.base, 'download-cad', params] as const,
};

export const useGetCustoms = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(params),
		queryFn: async () => (await api.all(params)).data,
		enabled,
	});

export const useGetCustom = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});

export const useGetRecentCustom = (params: Recent, enabled?: boolean) =>
	useQuery({
		queryKey: keys.recent(params),
		queryFn: async () => (await api.recent(params)).data,
		enabled,
	});

export const useGetCustomsStats = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.stats(),
		queryFn: async () => (await api.stats()).data,
		enabled,
	});

export const useGetCustomSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.sortings(),
		queryFn: async () => (await api.sortings()).data,
		enabled,
	});

export const useGetCustomPaymentStatuses = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.paymentStatuses(),
		queryFn: async () => (await api.paymentStatuses()).data,
		enabled,
	});

export const useCalculateCustomShipment = (
	params: Calculate,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: keys.calculateShipment(params),
		queryFn: async () => (await api.calculateShipment(params)).data,
		enabled,
	});

export const useDownloadCustomCad = (params: Download, enabled?: boolean) =>
	useQuery({
		queryKey: keys.download(params),
		queryFn: async () => (await api.download(params)).data,
		enabled,
	});
