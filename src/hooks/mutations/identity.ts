import { useMutation } from '@tanstack/react-query';
import { Request as Login } from '@/api/identity/identity/login';
import { Request as ResetPassword } from '@/api/identity/identity/reset-password';
import { Request as ChangeUsername } from '@/api/identity/identity/change-username';
import { Request as Register } from '@/api/identity/identity/register';
import { Request as RetryConfirmEmail } from '@/api/identity/identity/retry-confirm-email';
import {
	login,
	logout,
	refresh,
	changeUsername,
	delete_,
	resetPassword,
	register,
	retryConfirmEmail,
} from '@/api/identity/identity';

export const useLogin = () =>
	useMutation({
		mutationKey: ['sign-in', 'login'],
		mutationFn: async (params: Login) => (await login(params)).data,
	});

export const useLogout = () =>
	useMutation({
		mutationKey: ['sign-in', 'logout'],
		mutationFn: async () => (await logout()).data,
	});

export const useRefresh = () =>
	useMutation({
		mutationKey: ['identity', 'refresh'],
		mutationFn: async () => (await refresh()).data,
	});

export const useChangeUsername = () =>
	useMutation({
		mutationKey: ['identity', 'change-username'],
		mutationFn: async (req: ChangeUsername) =>
			(await changeUsername(req)).data,
	});

export const useDeleteMyAccount = () =>
	useMutation({
		mutationKey: ['identity', 'delete'],
		mutationFn: async () => (await delete_()).data,
	});

export const useResetPassword = () =>
	useMutation({
		mutationKey: ['identity', 'reset-password'],
		mutationFn: async (params: ResetPassword) =>
			(await resetPassword(params)).data,
	});

export const useRegister = () =>
	useMutation({
		mutationKey: ['identity', 'register'],
		mutationFn: async (params: Register) => (await register(params)).data,
	});

export const useRetryConfirmEmail = () =>
	useMutation({
		mutationKey: ['identity', 'retry-confirm-email'],
		mutationFn: async (params: RetryConfirmEmail) =>
			(await retryConfirmEmail(params)).data,
	});
