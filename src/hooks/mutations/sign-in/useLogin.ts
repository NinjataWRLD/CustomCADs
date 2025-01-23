import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/identity/sign-in/requests';
import { Request } from '@/api/identity/sign-in/types/login';

const useLogin = () =>
	useMutation({
		mutationKey: ['sign-in', 'login'],
		mutationFn: async (params: Request) => (await login(params)).data,
	});

export default useLogin;
