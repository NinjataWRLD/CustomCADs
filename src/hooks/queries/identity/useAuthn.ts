import { useQuery } from '@tanstack/react-query';
import { authn } from '@/api/identity/info/requests';

const useAuthn = () =>
	useQuery({
		queryKey: ['identity', 'authn'],
		queryFn: async () => (await authn()).data,
	});

export default useAuthn;
