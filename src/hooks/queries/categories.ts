import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/catalog/categories/single';
import * as api from '@/api/catalog/categories';

export const keys = {
	base: ['categories'] as const,
	all: () => [...keys.base, 'all'] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
};

export const useGetCategories = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(),
		queryFn: async () => (await api.all()).data,
		enabled,
	});

const useGetCategory = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});

export default useGetCategory;
