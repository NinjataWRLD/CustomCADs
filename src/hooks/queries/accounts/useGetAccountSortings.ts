import { useQuery } from '@tanstack/react-query';
import { sortings } from '@/api/accounts/accounts';

const useGetAccountSortings = () =>
	useQuery({
		queryKey: ['accounts', 'sortings'],
		queryFn: async () => (await sortings()).data,
	});

export default useGetAccountSortings;
