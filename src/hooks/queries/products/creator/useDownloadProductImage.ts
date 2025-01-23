import { useQuery } from '@tanstack/react-query';
import { downloadImage } from '@/api/catalog/products/creator/requests';
import { Request } from '@/api/catalog/products/creator/types/download';

const useDownloadProductImage = (params: Request) =>
	useQuery({
		queryKey: ['products', 'creator', 'download-image', params],
		queryFn: async () => (await downloadImage(params)).data,
	});

export default useDownloadProductImage;
