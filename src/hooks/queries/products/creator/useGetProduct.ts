import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/catalog/products/creator/requests';
import { Request } from '@/api/catalog/products/creator/types/single';

const useGetProduct = (params: Request) =>
	useQuery({
		queryKey: ['products', 'creator', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetProduct;
