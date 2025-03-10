import { useQuery } from '@tanstack/react-query';
import { download } from '@/api/carts/purchased';
import { Request } from '@/api/carts/purchased/resources/download';

const useDownloadPurchasedCartCad = (params: Request) =>
	useQuery({
		queryKey: ['purchased-carts', 'download', params],
		queryFn: async () => (await download(params)).data,
	});

export default useDownloadPurchasedCartCad;
