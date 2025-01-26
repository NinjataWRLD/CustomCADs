import { useQuery } from '@tanstack/react-query';
import { validated } from '@/api/catalog/products/designer';
import { Request } from '@/api/catalog/products/designer/resources/all';

const useGetValidatedProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'designer', 'validated', params],
		queryFn: async () => (await validated(params)).data,
	});

export default useGetValidatedProducts;
