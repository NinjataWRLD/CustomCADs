import { useQuery } from '@tanstack/react-query';
import { stats } from '@/api/carts/purchased';

const useGetPurchasedCartsStats = () =>
	useQuery({
		queryKey: ['purchased-carts', 'stats'],
		queryFn: async () => (await stats()).data,
	});

export default useGetPurchasedCartsStats;
