import { Store } from '@tanstack/store';
import { getCookie } from '@/utils/cookie-manager';

interface AuthState {
	authn: boolean;
	authz: string | null;
}

const role = getCookie('role');
const defaultState: AuthState = {
	authn: Boolean(role),
	authz: role ?? null,
};
const store = new Store<AuthState>(defaultState);

export const login = (role: string) => {
	store.setState(() => ({ authn: true, authz: role }));
};

export const logout = () => {
	store.setState(() => ({ authn: false, authz: null }));
};

export default store;
