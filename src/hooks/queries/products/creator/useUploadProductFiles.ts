import { useQuery } from '@tanstack/react-query';
import { upload } from '@/api/catalog/products/creator/requests';
import { Request } from '@/api/catalog/products/creator/types/upload';

const useUploadProductFiles = (params: Request) =>
	useQuery({
		queryKey: ['products', 'creator', 'upload-files', params],
		queryFn: async () => (await upload(params)).data,
	});

export default useUploadProductFiles;
