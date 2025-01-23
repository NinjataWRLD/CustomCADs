import { useQuery } from '@tanstack/react-query';
import { recent } from '@/api/catalog/products/creator/requests';
import { Request } from '@/api/catalog/products/creator/types/recent';

const useGetRecentProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'creator', 'recent', params],
		queryFn: async () => (await recent(params)).data,
	});

export default useGetRecentProducts;
