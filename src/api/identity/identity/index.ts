import { axios } from '@/api/axios';
import * as authnResources from './resources/authn';
import * as authzResources from './resources/authz';
import * as loginResources from './resources/login';
import * as refreshResources from './resources/refresh';
import * as logoutResources from './resources/logout';
import * as forgotPasswordResources from './resources/forgot-password';
import * as resetPasswordResources from './resources/reset-password';
import * as registerResources from './resources/register';
import * as retryConfirmEmailResources from './resources/retry-confirm-email';

export const authn = async () =>
	await axios.get<authnResources.Response>(authnResources.url());

export const authz = async () =>
	await axios.get<authzResources.Response>(authzResources.url());

export const login = async (req: loginResources.Request) =>
	await axios.post(loginResources.url(), req);

export const refresh = async () => await axios.post(refreshResources.url());

export const logout = async () => await axios.post(logoutResources.url());

export const forgotPassword = async (req: forgotPasswordResources.Request) =>
	await axios.get(forgotPasswordResources.url(req));

export const resetPassword = async (req: resetPasswordResources.Request) =>
	await axios.post(resetPasswordResources.url(), req);

export const register = async (req: registerResources.Request) =>
	await axios.post(registerResources.url(), req);

export const retryConfirmEmail = async (
	req: retryConfirmEmailResources.Request,
) => await axios.get(retryConfirmEmailResources.url(req));
