import { useMutation } from '@tanstack/react-query';
import { register } from '@/api/identity/sign-up';
import { Request } from '@/api/identity/sign-up/resources/register';

const useRegister = () =>
	useMutation({
		mutationKey: ['sign-in', 'register'],
		mutationFn: async (params: Request) => (await register(params)).data,
	});

export default useRegister;
