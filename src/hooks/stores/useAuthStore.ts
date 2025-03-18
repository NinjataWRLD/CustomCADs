import { useMemo } from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '@/stores/auth-store';

export const useAuthStore = () => {
	const { authn, authz } = useStore(store);

	const is = useMemo(() => {
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
	}, [authn, authz]);

	return { authn, authz, is };
};
