import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/files/cads/all';
import { Request as Single } from '@/api/files/cads/single';
import * as api from '@/api/files/cads';

export const keys = {
	base: ['cads'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
};

export const useGetCads = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(params),
		queryFn: async () => (await api.all(params)).data,
		enabled,
	});

export const useGetCad = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});
