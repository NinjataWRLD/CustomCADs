import { useQuery } from '@tanstack/react-query';
import { validated } from '@/api/catalog/products/designer/requests';
import { Request } from '@/api/catalog/products/designer/types/all';

const useGetValidatedProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'designer', 'validated', params],
		queryFn: async () => (await validated(params)).data,
	});

export default useGetValidatedProducts;
