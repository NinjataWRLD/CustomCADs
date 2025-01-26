import { useMutation } from '@tanstack/react-query';
import { refresh } from '@/api/identity/sign-in';

const useRefresh = () =>
	useMutation({
		mutationKey: ['sign-in', 'refresh'],
		mutationFn: async () => (await refresh()).data,
	});

export default useRefresh;
