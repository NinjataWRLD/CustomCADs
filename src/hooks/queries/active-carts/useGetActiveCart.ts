import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/carts/active';

const useGetActiveCart = (enabled?: boolean) =>
	useQuery({
		queryKey: ['active-carts', 'single'],
		queryFn: async () => (await single()).data,
		enabled: enabled,
	});

export default useGetActiveCart;
