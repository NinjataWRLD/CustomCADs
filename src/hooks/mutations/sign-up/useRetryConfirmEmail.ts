import { useMutation } from '@tanstack/react-query';
import { retryConfirmEmail } from '@/api/identity/sign-up';
import { Request } from '@/api/identity/sign-up/resources/retry-confirm-email';

const useRetryConfirmEmail = () =>
	useMutation({
		mutationKey: ['sign-in', 'retry-confirm-email'],
		mutationFn: async (params: Request) =>
			(await retryConfirmEmail(params)).data,
	});

export default useRetryConfirmEmail;
