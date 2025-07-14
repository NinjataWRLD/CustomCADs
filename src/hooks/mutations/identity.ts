import { useMutation } from '@tanstack/react-query';
import { Request as Login } from '@/api/identity/identity/login';
import { Request as ResetPassword } from '@/api/identity/identity/reset-password';
import { Request as ChangeUsername } from '@/api/identity/identity/change-username';
import { Request as Register } from '@/api/identity/identity/register';
import { Request as RetryConfirmEmail } from '@/api/identity/identity/retry-confirm-email';
import * as api from '@/api/identity/identity';

export const keys = {
	base: ['identity'] as const,
	login: () => [...keys.base, 'login'] as const,
	logout: () => [...keys.base, 'logout'] as const,
	refresh: () => [...keys.base, 'refresh'] as const,
	changeUsername: () => [...keys.base, 'change-username'] as const,
	toggleTrackViewedProducts: () =>
		[...keys.base, 'toggle-track-viewed-products'] as const,
	deleteMyAccount: () => [...keys.base, 'delete-my-account'] as const,
	resetPassword: () => [...keys.base, 'reset-password'] as const,
	register: () => [...keys.base, 'register'] as const,
	retryConfirmEmail: () => [...keys.base, 'retry-confirm-email'] as const,
};

export const useLogin = () =>
	useMutation({
		mutationKey: keys.login(),
		mutationFn: async (params: Login) => (await api.login(params)).data,
	});

export const useLogout = () =>
	useMutation({
		mutationKey: keys.logout(),
		mutationFn: async () => (await api.logout()).data,
	});

export const useRefresh = () =>
	useMutation({
		mutationKey: keys.refresh(),
		mutationFn: async () => (await api.refresh()).data,
	});

export const useChangeUsername = () =>
	useMutation({
		mutationKey: keys.changeUsername(),
		mutationFn: async (req: ChangeUsername) =>
			(await api.changeUsername(req)).data,
	});

export const useToggleTrackViewedProducts = () =>
	useMutation({
		mutationKey: keys.toggleTrackViewedProducts(),
		mutationFn: async () => (await api.toggleTrackViewedProducts()).data,
	});

export const useDeleteMyAccount = () =>
	useMutation({
		mutationKey: keys.deleteMyAccount(),
		mutationFn: async () => (await api.delete_()).data,
	});

export const useResetPassword = () =>
	useMutation({
		mutationKey: keys.resetPassword(),
		mutationFn: async (params: ResetPassword) =>
			(await api.resetPassword(params)).data,
	});

export const useRegister = () =>
	useMutation({
		mutationKey: keys.register(),
		mutationFn: async (params: Register) =>
			(await api.register(params)).data,
	});

export const useRetryConfirmEmail = () =>
	useMutation({
		mutationKey: keys.retryConfirmEmail(),
		mutationFn: async (params: RetryConfirmEmail) =>
			(await api.retryConfirmEmail(params)).data,
	});
