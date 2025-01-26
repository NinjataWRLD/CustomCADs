import axios from '@/api/axios';
import * as registerResources from './resources/register';
import * as retryConfirmEmailResources from './resources/retry-confirm-email';

export const register = async (req: registerResources.Request) =>
	await axios.post(registerResources.url(), req);

export const retryConfirmEmail = async (
	req: retryConfirmEmailResources.Request,
) => await axios.get(retryConfirmEmailResources.url(req));
