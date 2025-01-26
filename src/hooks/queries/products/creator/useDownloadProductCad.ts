import { useQuery } from '@tanstack/react-query';
import { downloadCad } from '@/api/catalog/products/creator';
import { Request } from '@/api/catalog/products/creator/resources/download';

const useDownloadProductCad = (params: Request) =>
	useQuery({
		queryKey: ['products', 'creator', 'download-cad', params],
		queryFn: async () => (await downloadCad(params)).data,
	});

export default useDownloadProductCad;
