import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/customizations/customizations';
import { Request } from '@/api/customizations/customizations/resources/single';

const useGetCustomization = (params: Request, enabled?: boolean) =>
	useQuery({
		queryKey: ['customizations', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled: enabled,
	});

export default useGetCustomization;
