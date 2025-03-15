import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/customizations/customizations';
import { Request as Single } from '@/api/customizations/customizations/resources/single';

export const useGetCustomization = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['customizations', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled: enabled,
	});
