import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/catalog/tags/resources/single';
import { all, single } from '@/api/catalog/tags';

export const useGetTags = (enabled?: boolean) =>
	useQuery({
		queryKey: ['catalog', 'tags', 'all'],
		queryFn: async () => (await all()).data,
		enabled,
	});

export const useGetTag = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['catalog', 'tags', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});
