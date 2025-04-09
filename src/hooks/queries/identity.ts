import { useQuery } from '@tanstack/react-query';
import { Request as ForgotPassword } from '@/api/identity/identity/forgot-password';
import { authn, authz, forgotPassword } from '@/api/identity/identity';

export const useAuthn = (enabled?: boolean) =>
	useQuery({
		queryKey: ['identity', 'authn'],
		queryFn: async () => (await authn()).data,
		enabled: enabled,
	});

export const useAuthz = (enabled?: boolean) =>
	useQuery({
		queryKey: ['identity', 'authz'],
		queryFn: async () => (await authz()).data,
		enabled: enabled,
	});

export const useForgotPassword = (params: ForgotPassword, enabled?: boolean) =>
	useQuery({
		queryKey: ['identity', 'forgot-password', params],
		queryFn: async () => (await forgotPassword(params)).data,
		enabled: enabled,
	});
