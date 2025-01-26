import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/accounts/roles';
import { Request } from '@/api/accounts/roles/resources/single';

const useGetRole = (params: Request) =>
	useQuery({
		queryKey: ['roles', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetRole;
