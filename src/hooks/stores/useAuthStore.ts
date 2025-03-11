import { useEffect } from 'react';
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

	return state;
};

export default useAuthStore;
