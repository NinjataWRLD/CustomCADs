import { useQuery } from '@tanstack/react-query';
import { authn } from '@/api/identity/info';

const useAuthn = (enabled?: boolean) =>
	useQuery({
		queryKey: ['identity', 'authn'],
		queryFn: async () => (await authn()).data,
		enabled: enabled,
	});

export default useAuthn;
