import { useEffect } from 'react';
import { login, logout } from '@/stores/auth-store';
import { useRefresh } from '@/hooks/mutations/identity';
import { useAuthn, useAuthz } from '@/hooks/queries/identity';
import { useAuthStore } from './useAuthStore';

export const useAuth = () => {
	const state = useAuthStore();
	const { mutateAsync: refreshAuth } = useRefresh();

	const { refetch: refetchAuthn } = useAuthn(false);
	const { refetch: refetchAuthz } = useAuthz(false);

	useEffect(() => {
		let retries = 0;
		const sync = async () => {
			const { data: authn } = await refetchAuthn();
			if (!authn) {
				try {
					retries += 1;
					await refreshAuth();
					if (retries < 2) sync();
				} catch {
					logout();
					return;
				}
			}

			const { data: authz } = await refetchAuthz();
			if (authz) {
				login(authz);
			}
		};
		sync();
	}, [state.authn, state.authz]);

	return state;
};
