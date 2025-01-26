import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/carts/purchased';
import { Request } from '@/api/carts/purchased/resources/single';

const useGetPurchasedCart = (params: Request) =>
	useQuery({
		queryKey: ['purchased-carts', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetPurchasedCart;
