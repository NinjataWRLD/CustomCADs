import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/carts/purchased/requests';
import { Request } from '@/api/carts/purchased/types/all';

const useGetPurchasedCarts = (params: Request) =>
	useQuery({
		queryKey: ['purchased-carts', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetPurchasedCarts;
