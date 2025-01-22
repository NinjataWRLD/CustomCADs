import axios, { AxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? 'v1';

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
		const refresh = '/identity/signin/refresh';

		if (response?.status === 401 && config?.url !== refresh) {
			try {
				await instance.post(refresh);
				return axios(config!);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default instance;
