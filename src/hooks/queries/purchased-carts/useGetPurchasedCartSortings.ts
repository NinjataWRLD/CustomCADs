import { useQuery } from '@tanstack/react-query';
import { sortings } from '@/api/carts/purchased';

const useGetPurchasedCartsSortings = () =>
	useQuery({
		queryKey: ['purchased-carts', 'sortings'],
		queryFn: async () => (await sortings()).data,
	});

export default useGetPurchasedCartsSortings;
