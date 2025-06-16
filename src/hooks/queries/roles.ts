import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/accounts/roles/single';
import * as api from '@/api/accounts/roles';

export const keys = {
	base: ['roles'] as const,
	all: () => [...keys.base, 'all'],
	single: (params: Single) => [...keys.base, 'single', params],
};

export const useGetRoles = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(),
		queryFn: async () => (await api.all()).data,
		enabled,
	});

const useGetRole = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});

export default useGetRole;
