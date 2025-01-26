import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/catalog/products/creator';
import { Request } from '@/api/catalog/products/creator/resources/all';

const useGetProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'creator', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetProducts;
