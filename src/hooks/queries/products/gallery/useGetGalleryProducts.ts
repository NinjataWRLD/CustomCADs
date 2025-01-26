import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/catalog/products/gallery';
import { Request } from '@/api/catalog/products/gallery/resources/all';

const useGetProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'gallery', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetProducts;
