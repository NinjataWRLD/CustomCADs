import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/printing/materials/single';
import * as api from '@/api/printing/materials';

export const keys = {
	base: ['materials'] as const,
	all: () => [...keys.base, 'all'] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
};

export const useGetMaterials = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(),
		queryFn: async () => (await api.all()).data,
		enabled,
	});

export const useGetMaterial = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled: enabled,
	});
