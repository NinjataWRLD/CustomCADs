import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/notifications/notifications/all';
import * as api from '@/api/notifications/notifications';

export const keys = {
	base: ['notifications'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
	sortings: () => [...keys.base, 'sortings'] as const,
	statuses: () => [...keys.base, 'statuses'] as const,
	stats: () => [...keys.base, 'stats'] as const,
};

export const useGetNotifications = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(params),
		queryFn: async () => (await api.all(params)).data,
		enabled,
	});

export const useGetNotificationSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.sortings(),
		queryFn: async () => (await api.sortings()).data,
		enabled,
	});

export const useGetNotificationStatuses = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.statuses(),
		queryFn: async () => (await api.statuses()).data,
		enabled,
	});

export const useGetNotificationStats = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.stats(),
		queryFn: async () => (await api.stats()).data,
		enabled,
	});
