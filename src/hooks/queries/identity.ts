import { useQuery } from '@tanstack/react-query';
import * as api from '@/api/identity/identity';

export const keys = {
	base: ['identity'] as const,
	authn: () => [...keys.base, 'authn'] as const,
	authz: () => [...keys.base, 'authz'] as const,
	myAccount: () => [...keys.base, 'my-account'] as const,
	downloadInfo: () => [...keys.base, 'download-info'] as const,
};

export const useAuthn = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.authn(),
		queryFn: async () => (await api.authn()).data,
		enabled: enabled,
	});

export const useAuthz = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.authz(),
		queryFn: async () => (await api.authz()).data,
		enabled: enabled,
	});

export const useMyAccount = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.myAccount(),
		queryFn: async () => (await api.myAccount()).data,
		enabled: enabled,
	});

export const useDownloadAccountInfo = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.downloadInfo(),
		queryFn: async () => (await api.downloadInfo()).data,
		enabled: enabled,
	});
