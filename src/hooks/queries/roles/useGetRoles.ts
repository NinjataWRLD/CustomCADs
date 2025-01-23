import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/accounts/roles/requests';

const useGetRoles = () =>
	useQuery({
		queryKey: ['roles', 'all'],
		queryFn: async () => (await all()).data,
	});

export default useGetRoles;
