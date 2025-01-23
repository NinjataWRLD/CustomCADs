import { useQuery } from '@tanstack/react-query';
import { unchecked } from '@/api/catalog/products/designer/requests';
import { Request } from '@/api/catalog/products/designer/types/all';

const useGetUncheckedProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'designer', 'unchecked', params],
		queryFn: async () => (await unchecked(params)).data,
	});

export default useGetUncheckedProducts;
