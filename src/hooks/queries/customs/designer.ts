import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/customs/customs/designer/all';
import { Request as Single } from '@/api/customs/customs/designer/single';
import * as api from '@/api/customs/customs/designer';

export const keys = {
	base: ['customs', 'designer'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
};

export const useGetCustoms = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(params),
		queryFn: async () => (await api.all(params)).data,
		enabled,
	});

export const useGetCustom = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});
