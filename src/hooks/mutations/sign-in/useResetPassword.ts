import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api/identity/sign-in/requests';
import { Request } from '@/api/identity/sign-in/types/reset-password';

const useResetPassword = () =>
	useMutation({
		mutationKey: ['sign-in', 'reset-password'],
		mutationFn: async (params: Request) =>
			(await resetPassword(params)).data,
	});

export default useResetPassword;
