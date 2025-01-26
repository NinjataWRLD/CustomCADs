import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/accounts/accounts';
import { Request } from '@/api/accounts/accounts/resources/all';

const useGetAccounts = (params: Request) =>
	useQuery({
		queryKey: ['accounts', 'all', params],
		queryFn: async () => (await all(params)).data,
	});

export default useGetAccounts;
