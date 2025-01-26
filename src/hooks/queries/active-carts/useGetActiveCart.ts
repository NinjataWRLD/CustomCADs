import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/carts/active';

const useGetActiveCart = () =>
	useQuery({
		queryKey: ['active-carts', 'single'],
		queryFn: async () => (await single()).data,
	});

export default useGetActiveCart;
