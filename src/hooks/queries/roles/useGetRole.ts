import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/accounts/roles/requests';
import { Request } from '@/api/accounts/roles/types/single';

const useGetRole = (params: Request) =>
	useQuery({
		queryKey: ['roles', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetRole;
