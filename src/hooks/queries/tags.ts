import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/catalog/tags/single';
import * as api from '@/api/catalog/tags';

export const keys = {
	base: ['tags'] as const,
	all: () => [...keys.base, 'all'] as const,
	single: (params: Single) => [...keys.base, 'sinlge', params] as const,
};

export const useGetTags = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(),
		queryFn: async () => (await api.all()).data,
		enabled,
	});

export const useGetTag = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});
