import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/accounts/accounts';
import { Request } from '@/api/accounts/accounts/resources/single';

const useGetAccount = (params: Request) =>
	useQuery({
		queryKey: ['accounts', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetAccount;
