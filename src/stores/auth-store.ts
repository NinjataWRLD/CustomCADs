import { Store } from '@tanstack/store';
import Cookies from 'js-cookie';

const role = Cookies.get('role');

type AuthState = {
	authn: boolean;
	authz: string | null;
};
const defaultState: AuthState = {
	authn: Boolean(role),
	authz: role ?? null,
};
export const store = new Store<AuthState>(defaultState);

export const login = (role: string) => {
	store.setState(() => ({ authn: true, authz: role }));
};

export const logout = () => {
	store.setState(() => ({ authn: false, authz: null }));
};
