import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/customs/customs/client/resources/all';
import { Request as Recent } from '@/api/customs/customs/client/resources/recent';
import { Request as Single } from '@/api/customs/customs/client/resources/single';
import { Request as Caluclate } from '@/api/customs/customs/client/resources/calculate-shipment';
import { Request as Download } from '@/api/customs/customs/client/resources/download';
import {
	all,
	calculateShipment,
	download,
	recent,
	single,
	sortings,
	stats,
} from '@/api/customs/customs/client';

export const useGetCustoms = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'client', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetCustom = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'client', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export const useGetRecentCustom = (params: Recent, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'client', 'recent', params],
		queryFn: async () => (await recent(params)).data,
		enabled,
	});

export const useGetCustomsStats = (enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'client', 'stats'],
		queryFn: async () => (await stats()).data,
		enabled,
	});

export const useGetCustomSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'client', 'sortings'],
		queryFn: async () => (await sortings()).data,
		enabled,
	});

export const useCalculateCustomShipment = (
	params: Caluclate,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: ['customs', 'client', 'calculate-shipment', params],
		queryFn: async () => (await calculateShipment(params)).data,
		enabled,
	});

export const useDownloadCustomCad = (params: Download, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'client', 'download-cad', params],
		queryFn: async () => (await download(params)).data,
		enabled,
	});
