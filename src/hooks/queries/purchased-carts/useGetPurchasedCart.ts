import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/carts/purchased/requests';
import { Request } from '@/api/carts/purchased/types/single';

const useGetPurchasedCart = (params: Request) =>
	useQuery({
		queryKey: ['purchased-carts', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetPurchasedCart;
