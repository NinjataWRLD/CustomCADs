import { useEffect } from 'react';
import { login, logout } from '@/stores/auth-store';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import { useRefresh } from '@/hooks/mutations/identity';
import { useAuthn, useAuthz } from '@/hooks/queries/identity';
import { useAuthStore } from './useAuthStore';

export const useAuth = () => {
	const state = useAuthStore();

	const { idempotencyKeys } = useIdempotencyKeys(['refresh'] as const);
	const { mutateAsync: refreshAuth } = useRefresh();

	const { refetch: refetchAuthn } = useAuthn(false);
	const { refetch: refetchAuthz } = useAuthz(false);

	useEffect(() => {
		const sync = async () => {
			const { data: authn } = await refetchAuthn();
			if (!authn) {
				try {
					await refreshAuth({
						idempotencyKey: idempotencyKeys.refresh,
					});
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
