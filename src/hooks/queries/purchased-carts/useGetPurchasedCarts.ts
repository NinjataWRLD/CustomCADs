import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/carts/purchased';
import { Request } from '@/api/carts/purchased/resources/all';

const useGetPurchasedCarts = (params: Request) =>
	useQuery({
		queryKey: ['purchased-carts', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetPurchasedCarts;
