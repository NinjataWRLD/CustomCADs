import axios from '@/api/axios';
import * as loginDtos from './types/login';
import * as resetPasswordDtos from './types/reset-password';

const BASE_PATH = '/identity/signin';

export const login = async (req: loginDtos.Request) =>
	await axios.post(`${BASE_PATH}/login`, req);

export const refresh = async () => await axios.post(`${BASE_PATH}/refresh`);

export const logout = async () => await axios.post(`${BASE_PATH}/logout`);

export const resetPassword = async (req: resetPasswordDtos.Request) =>
	await axios.post(`${BASE_PATH}/password/forgot/${req.email}`);
