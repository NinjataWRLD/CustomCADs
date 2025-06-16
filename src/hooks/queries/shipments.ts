import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/delivery/shipments/all';
import { Request as Waybill } from '@/api/delivery/shipments/waybill';
import { Request as Track } from '@/api/delivery/shipments/track';
import * as api from '@/api/delivery/shipments';

export const keys = {
	base: ['shipments'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
	sortings: () => [...keys.base, 'sortings'] as const,
	waybill: (params: Waybill) => [...keys.base, 'waybill', params] as const,
	track: (params: Track) => [...keys.base, 'track', params] as const,
};

export const useGetShipments = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(params),
		queryFn: async () => (await api.all(params)).data,
		enabled,
	});

export const useGetShipmentSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.sortings(),
		queryFn: async () => (await api.sortings()).data,
		enabled,
	});

export const useGetShipmentWaybill = (params: Waybill, enabled?: boolean) =>
	useQuery({
		queryKey: keys.waybill(params),
		queryFn: async () => (await api.waybill(params)).data,
		enabled,
	});

export const useTrackShipment = (params: Track, enabled?: boolean) =>
	useQuery({
		queryKey: keys.track(params),
		queryFn: async () => (await api.track(params)).data,
		enabled,
	});
