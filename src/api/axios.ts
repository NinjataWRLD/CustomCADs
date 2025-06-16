import axios, { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import * as authStore from '@/stores/auth-store';
import { authz, refresh } from './identity/identity';

const BASE_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION ?? 'v1';

const instance = axios.create({
	baseURL: `${BASE_URL}/api/${API_VERSION}`,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use((cfg) => {
	cfg.headers['Csrf-Token'] = Cookies.get('csrf');
	return cfg;
});

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.config?.url === '/identity/refresh') {
			return Promise.reject(error);
		}

		if (isAxiosError(error)) {
			const { response } = error;
			if (response?.status !== 401 && response?.status !== 403) {
				return Promise.reject(error);
			}
		}

		try {
			await refresh();
			const { data: role } = await authz();

			authStore.login(role);
			return axios(error.config!);
		} catch (error) {
			return Promise.reject(error);
		}
	},
);

export { instance as axios };
