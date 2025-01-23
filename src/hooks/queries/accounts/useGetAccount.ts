import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/accounts/accounts/requests';
import { Request } from '@/api/accounts/accounts/types/single';

const useGetAccount = (params: Request) =>
	useQuery({
		queryKey: ['accounts', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetAccount;
