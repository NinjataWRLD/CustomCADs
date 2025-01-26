import { useQuery } from '@tanstack/react-query';
import { reported } from '@/api/catalog/products/designer';
import { Request } from '@/api/catalog/products/designer/resources/all';

const useGetReportedProducts = (params: Request) =>
	useQuery({
		queryKey: ['products', 'designer', 'reported', params],
		queryFn: async () => (await reported(params)).data,
	});

export default useGetReportedProducts;
