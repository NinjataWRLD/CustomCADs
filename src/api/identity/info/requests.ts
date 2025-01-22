import axios from '@/api/axios';

const BASE_PATH = '/identity/info';

export const authn = async () =>
	await axios.get<boolean>(`${BASE_PATH}/authentication`);

export const authz = async () =>
	await axios.get<string>(`${BASE_PATH}/authorization`);
