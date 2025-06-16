import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/catalog/products/designer/all';
import { Request as Single } from '@/api/catalog/products/designer/single';
import * as api from '@/api/catalog/products/designer';

export const keys = {
	base: ['products', 'designer'] as const,
	unchecked: (params: All) => [...keys.base, 'unchecked', params] as const,
	validated: (params: All) => [...keys.base, 'validated', params] as const,
	reported: (params: All) => [...keys.base, 'reported', params] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
};

export const useGetUncheckedProducts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.unchecked(params),
		queryFn: async () => (await api.unchecked(params)).data,
		enabled,
	});

export const useGetValidatedProducts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.validated(params),
		queryFn: async () => (await api.validated(params)).data,
		enabled,
	});

export const useGetReportedProducts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.reported(params),
		queryFn: async () => (await api.reported(params)).data,
		enabled,
	});

export const useGetProduct = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});
