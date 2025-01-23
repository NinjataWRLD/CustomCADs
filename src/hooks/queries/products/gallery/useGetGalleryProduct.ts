import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/catalog/products/gallery/requests';
import { Request } from '@/api/catalog/products/gallery/types/single';

const useGetProduct = (params: Request) =>
	useQuery({
		queryKey: ['products', 'gallery', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetProduct;
