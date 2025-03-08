import { useQuery } from '@tanstack/react-query';
import { replaceTexture } from '@/api/customizations/materials';
import { Request } from '@/api/customizations/materials/resources/replace';

const useReplaceMaterialTexture = (params: Request) =>
	useQuery({
		queryKey: ['materials', 'replace-texture', params],
		queryFn: async () => (await replaceTexture(params)).data,
	});

export default useReplaceMaterialTexture;
