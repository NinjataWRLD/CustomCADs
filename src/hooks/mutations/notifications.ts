import { useMutation } from '@tanstack/react-query';
import { Request as Read } from '@/api/notifications/notifications/read';
import { Request as Open } from '@/api/notifications/notifications/open';
import { Request as Hide } from '@/api/notifications/notifications/hide';
import * as api from '@/api/notifications/notifications';

export const keys = {
	base: ['notifications'] as const,
	read: () => [...keys.base, 'read'] as const,
	open: () => [...keys.base, 'open'] as const,
	hide: () => [...keys.base, 'hide'] as const,
};

export const useReadNotification = () =>
	useMutation({
		mutationKey: keys.read(),
		mutationFn: async (params: Read) => (await api.read(params)).data,
	});

export const useOpenNotification = () =>
	useMutation({
		mutationKey: keys.open(),
		mutationFn: async (params: Open) => (await api.open(params)).data,
	});

export const useHideNotification = () =>
	useMutation({
		mutationKey: keys.hide(),
		mutationFn: async (params: Hide) => (await api.hide(params)).data,
	});
