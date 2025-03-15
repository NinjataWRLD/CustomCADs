import { useMutation } from '@tanstack/react-query';
import { Request as Login } from '@/api/identity/identity/resources/login';
import { Request as ResetPassword } from '@/api/identity/identity/resources/reset-password';
import { Request as Register } from '@/api/identity/identity/resources/register';
import { Request as RetryConfirmEmail } from '@/api/identity/identity/resources/retry-confirm-email';
import {
	login,
	logout,
	refresh,
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
		mutationKey: ['sign-in', 'refresh'],
		mutationFn: async () => (await refresh()).data,
	});

export const useResetPassword = () =>
	useMutation({
		mutationKey: ['sign-in', 'reset-password'],
		mutationFn: async (params: ResetPassword) =>
			(await resetPassword(params)).data,
	});

export const useRegister = () =>
	useMutation({
		mutationKey: ['sign-up', 'register'],
		mutationFn: async (params: Register) => (await register(params)).data,
	});

export const useRetryConfirmEmail = () =>
	useMutation({
		mutationKey: ['sign-up', 'retry-confirm-email'],
		mutationFn: async (params: RetryConfirmEmail) =>
			(await retryConfirmEmail(params)).data,
	});
