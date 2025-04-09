import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/catalog/products/designer/all';
import { Request as Single } from '@/api/catalog/products/designer/single';
import {
	unchecked,
	validated,
	reported,
	single,
} from '@/api/catalog/products/designer';

export const useGetUncheckedProducts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'designer', 'unchecked', params],
		queryFn: async () => (await unchecked(params)).data,
		enabled,
	});

export const useGetValidatedProducts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'designer', 'validated', params],
		queryFn: async () => (await validated(params)).data,
		enabled,
	});

export const useGetReportedProducts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'designer', 'reported', params],
		queryFn: async () => (await reported(params)).data,
		enabled,
	});

export const useGetProduct = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'designer', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});
