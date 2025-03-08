import { useQuery } from '@tanstack/react-query';
import { downloadTexture } from '@/api/customizations/materials';
import { Request } from '@/api/customizations/materials/resources/download';

const useDownloadMaterialTexture = (params: Request) =>
	useQuery({
		queryKey: ['materials', 'download-texture', params],
		queryFn: async () => (await downloadTexture(params)).data,
	});

export default useDownloadMaterialTexture;
