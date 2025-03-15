import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/orders/ongoing/designer/resources/all';
import { Request as Single } from '@/api/orders/ongoing/designer/resources/single';
import { Request as Upload } from '@/api/orders/ongoing/designer/resources/upload';
import {
	accepted,
	begun,
	finished,
	pending,
	reported,
	single,
	uploadCad,
} from '@/api/orders/ongoing/designer';

export const useGetPendingOngoingOrders = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'pending', params],
		queryFn: async () => (await pending(params)).data,
		enabled,
	});

export const useGetAcceptedOngoingOrders = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'accepted', params],
		queryFn: async () => (await accepted(params)).data,
		enabled,
	});

export const useGetBegunOngoingOrders = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'begun', params],
		queryFn: async () => (await begun(params)).data,
		enabled,
	});

export const useGetFinishedOngoingOrders = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'finished', params],
		queryFn: async () => (await finished(params)).data,
		enabled,
	});

export const useGetReportedOngoingOrders = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'reported', params],
		queryFn: async () => (await reported(params)).data,
		enabled,
	});

export const useGetOngoingOrder = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-orders', 'designer', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export const useUploadOngoingOrderCad = (params: Upload, enabled?: boolean) =>
	useQuery({
		queryKey: ['ongoing-order', 'designer', 'upload-cad', params],
		queryFn: async () => (await uploadCad(params)).data,
		enabled,
	});
