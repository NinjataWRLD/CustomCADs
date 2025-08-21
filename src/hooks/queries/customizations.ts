import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/printing/customizations/single';
import * as api from '@/api/printing/customizations';

export const keys = {
	base: ['customizations'] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
};

export const useGetCustomization = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled: enabled,
	});
