import { useQuery } from '@tanstack/react-query';
import { downloadCad } from '@/api/catalog/products/creator/requests';
import { Request } from '@/api/catalog/products/creator/types/download';

const useDownloadProductCad = (params: Request) =>
	useQuery({
		queryKey: ['products', 'creator', 'download-cad', params],
		queryFn: async () => (await downloadCad(params)).data,
	});

export default useDownloadProductCad;
