import { Store } from '@tanstack/store';

interface AuthState {
	authn: boolean;
	authz: string | null;
}

const defaultState: AuthState = {
	authn: false,
	authz: null,
};
const store = new Store<AuthState>(defaultState);

export const login = (role: string) => {
	store.setState(() => ({ authn: true, authz: role }));
};

export const logout = () => {
	store.setState(() => ({ authn: false, authz: null }));
};

export default store;
