import * as axios from 'axios';
import Cookies from 'js-cookie';
import { authz, refresh } from '@/api/identity/identity';
import * as authStore from '@/stores/auth-store';
import IDEMPOTENCY from '@/constants/idempotency';

const BASE_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION ?? 'v1';

const instance = axios.default.create({
	baseURL: `${BASE_URL}/api/${API_VERSION}`,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

const refreshCsrf = (cfg: axios.InternalAxiosRequestConfig) => {
	cfg.headers['Csrf-Token'] = Cookies.get('csrf');
	return cfg;
};

instance.interceptors.request.use(refreshCsrf);

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (
			!axios.isAxiosError(error) ||
			!error.config ||
			error.config.url === '/identity/refresh'
		) {
			return Promise.reject(error);
		}

		const { response } = error;
		if (response?.status !== 401 && response?.status !== 403) {
			return Promise.reject(error);
		}

		try {
			await refresh({ idempotencyKey: IDEMPOTENCY.NEW_KEY() });
			const { data: role } = await authz();
			authStore.login(role);

			const config = refreshCsrf(error.config);
			return await axios.default(config);
		} catch (error) {
			return Promise.reject(error);
		}
	},
);

type ConfigProps = {
	idempotencyKey?: string;
	data?: unknown;
};
const config = (props?: ConfigProps): axios.AxiosRequestConfig => ({
	data: props?.data,
	headers: { [IDEMPOTENCY.HEADER]: props?.idempotencyKey },
});

export { instance as axios, config };
