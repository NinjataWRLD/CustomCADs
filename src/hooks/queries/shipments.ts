import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/delivery/shipments/resources/all';
import { Request as Waybill } from '@/api/delivery/shipments/resources/waybill';
import { Request as Track } from '@/api/delivery/shipments/resources/track';
import { all, sortings, track, waybill } from '@/api/delivery/shipments';

export const useGetShipments = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['shipments', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetShipmentSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: ['shipments', 'sortings'],
		queryFn: async () => (await sortings()).data,
		enabled,
	});

export const useGetShipmentWaybill = (params: Waybill, enabled?: boolean) =>
	useQuery({
		queryKey: ['shipments', 'waybill', params],
		queryFn: async () => (await waybill(params)).data,
		enabled,
	});

export const useTrackShipment = (params: Track, enabled?: boolean) =>
	useQuery({
		queryKey: ['shipments', 'track', params],
		queryFn: async () => (await track(params)).data,
		enabled,
	});
