import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/accounts/accounts/single';
import { Request as All } from '@/api/accounts/accounts/all';
import * as api from '@/api/accounts/accounts';

export const keys = {
	base: ['accounts'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
	sortings: () => [...keys.base, 'sortings'] as const,
};

export const useGetAccount = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});

export const useGetAccounts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(params),
		queryFn: async () => (await api.all(params)).data,
		enabled,
	});

export const useGetAccountSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.sortings(),
		queryFn: async () => (await api.sortings()).data,
		enabled,
	});
