import { useEffect, useMemo } from 'react';
import { useStore } from '@tanstack/react-store';
import authStore, { login, logout } from '@/stores/auth-store';
import useAuthn from '@/hooks/queries/identity/useAuthn';
import useAuthz from '@/hooks/queries/identity/useAuthz';

const useAuthStore = () => {
	const state = useStore(authStore);
	const { refetch: refetchAuthn } = useAuthn();
	const { refetch: refetchAuthz } = useAuthz(state.authn);

	useEffect(() => {
		const sync = async () => {
			const { data: authn } = await refetchAuthn();
			if (authn) {
				const { data: authz } = await refetchAuthz();
				if (authz) {
					login(authz);
				}
			} else if (authn === false) logout();
		};
		sync();
	}, [state]);

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
