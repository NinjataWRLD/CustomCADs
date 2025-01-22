import axios from '@/api/axios';
import * as registerDtos from './types/register';
import * as retryConfirmEmailDtos from './types/retry-confirm-email';

const BASE_PATH = '/identity/signup';

export const register = async (req: registerDtos.Request) =>
	await axios.post(`${BASE_PATH}/register`, req);

export const retryConfirmEmail = async (req: retryConfirmEmailDtos.Request) =>
	await axios.post(`${BASE_PATH}/email/confirm/${req.username}/retry`);
