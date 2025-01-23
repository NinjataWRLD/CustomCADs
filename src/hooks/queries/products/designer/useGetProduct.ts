import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/catalog/products/designer/requests';
import { Request } from '@/api/catalog/products/designer/types/single';

const useGetProduct = (params: Request) =>
	useQuery({
		queryKey: ['products', 'designer', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetProduct;
