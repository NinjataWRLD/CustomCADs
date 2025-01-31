import { downloadCad } from '@/api/catalog/products/gallery';
import { Request } from '@/api/catalog/products/gallery/resources/download';
import { useQuery } from '@tanstack/react-query';

const useDownloadProductCad = (params: Request) =>
	useQuery({
		queryKey: ['products', 'gallery', 'download-cad', params],
		queryFn: async () => (await downloadCad(params)).data,
	});

export default useDownloadProductCad;
