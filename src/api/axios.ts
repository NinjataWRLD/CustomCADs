import axios, { AxiosError } from 'axios';
import { refresh } from './identity/sign-in';

const BASE_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION ?? 'v1';

const instance = axios.create({
	baseURL: `${BASE_URL}/api/${API_VERSION}`,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (!(error instanceof AxiosError)) {
			return Promise.reject(error);
		}
		const { response, config } = error;

		if (
			response?.status === 401 &&
			config?.url !== '/identity/signin/refresh'
		) {
			try {
				await refresh();
				return axios(config!);
			} catch (error) {
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	},
);

export default instance;
