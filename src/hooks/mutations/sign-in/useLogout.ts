import { useMutation } from '@tanstack/react-query';
import { logout } from '@/api/identity/sign-in/requests';

const useLogout = () =>
	useMutation({
		mutationKey: ['sign-in', 'logout'],
		mutationFn: async () => (await logout()).data,
	});

export default useLogout;
