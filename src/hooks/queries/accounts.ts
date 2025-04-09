import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/accounts/accounts/single';
import { Request as All } from '@/api/accounts/accounts/all';
import { all, single, sortings } from '@/api/accounts/accounts';

export const useGetAccount = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['accounts', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export const useGetAccounts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['accounts', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetAccountSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: ['accounts', 'sortings'],
		queryFn: async () => (await sortings()).data,
		enabled,
	});
