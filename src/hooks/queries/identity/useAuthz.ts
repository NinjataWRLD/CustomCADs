import { useQuery } from '@tanstack/react-query';
import { authz } from '@/api/identity/info';

const useAuthz = (enabled?: boolean) =>
	useQuery({
		queryKey: ['identity', 'authz'],
		queryFn: async () => (await authz()).data,
		enabled: enabled,
	});

export default useAuthz;
