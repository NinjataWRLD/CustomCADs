import { useEffect, useMemo } from 'react';
import { useStore } from '@tanstack/react-store';
import authStore, { login, logout } from '@/stores/auth-store';
import useRefresh from '@/hooks/mutations/sign-in/useRefersh';
import useAuthn from '@/hooks/queries/identity/useAuthn';
import useAuthz from '@/hooks/queries/identity/useAuthz';

const useAuthStore = () => {
	const state = useStore(authStore);
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

	const is = useMemo(() => {
		const { authn, authz } = state;
		const roles = {
			guest: !authn,
			client: authn && authz === 'Client',
			contributor: authn && authz === 'Contributor',
			designer: authn && authz === 'Designer',
			admin: authn && authz === 'Admin',
		};

		return {
			...roles,
			creator: roles.contributor || roles.designer,
		};
	}, [state.authn, state.authz]);

	return { ...state, is: is };
};

export default useAuthStore;
