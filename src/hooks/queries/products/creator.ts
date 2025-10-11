import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/catalog/products/creator/all';
import { Request as Single } from '@/api/catalog/products/creator/single';
import { Request as Recent } from '@/api/catalog/products/creator/recent';
import * as api from '@/api/catalog/products/creator';

export const keys = {
	base: ['products', 'creator'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
	recent: (params: Recent) => [...keys.base, 'recent', params] as const,
	stats: () => [...keys.base, 'stats'] as const,
};

export const useGetProducts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(params),
		queryFn: async () => (await api.all(params)).data,
		enabled,
	});

export const useGetProduct = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});

export const useGetRecentProducts = (params: Recent, enabled?: boolean) =>
	useQuery({
		queryKey: keys.recent(params),
		queryFn: async () => (await api.recent(params)).data,
		enabled,
	});

export const useGetProductsStats = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.stats(),
		queryFn: async () => (await api.stats()).data,
		enabled,
	});
