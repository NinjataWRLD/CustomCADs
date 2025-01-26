import { useQuery } from '@tanstack/react-query';
import { unchecked } from '@/api/catalog/products/designer';
import { Request } from '@/api/catalog/products/designer/resources/all';

const useGetUncheckedProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'designer', 'unchecked', params],
		queryFn: async () => (await unchecked(params)).data,
	});

export default useGetUncheckedProducts;
