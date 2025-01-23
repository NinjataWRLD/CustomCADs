import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/catalog/products/gallery/requests';
import { Request } from '@/api/catalog/products/gallery/types/all';

const useGetProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'gallery', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetProducts;
