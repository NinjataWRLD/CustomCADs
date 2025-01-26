import { useQuery } from '@tanstack/react-query';
import { authn } from '@/api/identity/info';

const useAuthn = () =>
	useQuery({
		queryKey: ['identity', 'authn'],
		queryFn: async () => (await authn()).data,
	});

export default useAuthn;
