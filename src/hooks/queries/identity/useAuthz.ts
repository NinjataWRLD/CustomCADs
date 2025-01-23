import { useQuery } from '@tanstack/react-query';
import { authz } from '@/api/identity/info/requests';

const useAuthz = () =>
	useQuery({
		queryKey: ['identity', 'authz'],
		queryFn: async () => (await authz()).data,
	});

export default useAuthz;
