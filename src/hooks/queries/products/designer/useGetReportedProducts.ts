import { useQuery } from '@tanstack/react-query';
import { reported } from '@/api/catalog/products/designer/requests';
import { Request } from '@/api/catalog/products/designer/types/all';

const useGetReportedProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'designer', 'reported', params],
		queryFn: async () => (await reported(params)).data,
	});

export default useGetReportedProducts;
