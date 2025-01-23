import { useQuery } from '@tanstack/react-query';
import { stats } from '@/api/catalog/products/creator/requests';

const useGetProductsStats = () =>
	useQuery({
		queryKey: ['products', 'creator', 'stats'],
		queryFn: async () => (await stats()).data,
	});

export default useGetProductsStats;
