import { useQuery } from '@tanstack/react-query';
import { uploadTexture } from '@/api/customizations/materials';
import { Request } from '@/api/customizations/materials/resources/upload';

const useUploadMaterialTexture = (params: Request) =>
	useQuery({
		queryKey: ['materials', 'upload-texture', params],
		queryFn: async () => (await uploadTexture(params)).data,
	});

export default useUploadMaterialTexture;
