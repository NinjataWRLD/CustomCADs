import { useQuery } from '@tanstack/react-query';
import { recent } from '@/api/catalog/products/creator';
import { Request } from '@/api/catalog/products/creator/resources/recent';

const useGetRecentProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'creator', 'recent', params],
		queryFn: async () => (await recent(params)).data,
	});

export default useGetRecentProducts;
