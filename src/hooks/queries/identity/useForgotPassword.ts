import { useQuery } from '@tanstack/react-query';
import { forgotPassword } from '@/api/identity/sign-in';
import { Request } from '@/api/identity/sign-in/resources/forgot-password';

const useForgotPassword = (params: Request, enabled?: boolean) =>
	useQuery({
		queryKey: ['identity', 'forgot-password', params],
		queryFn: async () => (await forgotPassword(params)).data,
		enabled: enabled,
	});

export default useForgotPassword;
