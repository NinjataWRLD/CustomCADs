import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/customizations/materials';
import { Request } from '@/api/customizations/materials/resources/single';

const useGetMaterial = (params: Request, enabled?: boolean) =>
	useQuery({
		queryKey: ['materials', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled: enabled,
	});

export default useGetMaterial;
