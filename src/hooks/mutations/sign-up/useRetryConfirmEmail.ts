import { useMutation } from '@tanstack/react-query';
import { retryConfirmEmail } from '@/api/identity/sign-up/requests';
import { Request } from '@/api/identity/sign-up/types/retry-confirm-email';

const useRetryConfirmEmail = () =>
	useMutation({
		mutationKey: ['sign-in', 'retry-confirm-email'],
		mutationFn: async (params: Request) =>
			(await retryConfirmEmail(params)).data,
	});

export default useRetryConfirmEmail;
