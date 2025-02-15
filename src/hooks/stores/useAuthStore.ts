import { useEffect } from 'react';
import { useStore } from '@tanstack/react-store';
import authStore, { login, logout } from '@/stores/auth-store';
import useAuthn from '@/hooks/queries/identity/useAuthn';
import useAuthz from '@/hooks/queries/identity/useAuthz';

const useAuthStore = () => {
	const state = useStore(authStore);
	const { refetch: refetchAuthn } = useAuthn();
	const { data: authz } = useAuthz(state.authn);

	useEffect(() => {
		const sync = async () => {
			const { data: authn } = await refetchAuthn();

			if (authn && authz) {
				login(authz);
			} else if (authn === false) {
				logout();
			}
		};
		sync();
	}, [state]);

	return state;
};

export default useAuthStore;
