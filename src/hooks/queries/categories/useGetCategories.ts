import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/categories/categories/requests';

const useGetAccounts = () =>
	useQuery({
		queryKey: ['accounts', 'all'],
		queryFn: async () => (await all()).data,
	});

export default useGetAccounts;
