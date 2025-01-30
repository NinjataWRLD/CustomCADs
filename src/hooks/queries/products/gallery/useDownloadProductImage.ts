import { downloadImage } from '@/api/catalog/products/gallery';
import { Request } from '@/api/catalog/products/gallery/resources/download';
import { useQuery } from '@tanstack/react-query';

const useDownloadProductImage = (params: Request) =>
	useQuery({
		queryKey: ['products', 'gallery', 'download-image', params],
		queryFn: async () => (await downloadImage(params)).data,
	});

export default useDownloadProductImage;
