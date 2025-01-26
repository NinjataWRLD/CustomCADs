import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/catalog/products/gallery';
import { Request } from '@/api/catalog/products/gallery/resources/single';

const useGetProduct = (params: Request) =>
	useQuery({
		queryKey: ['products', 'gallery', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetProduct;
