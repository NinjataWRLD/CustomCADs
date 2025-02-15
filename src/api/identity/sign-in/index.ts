import axios from '@/api/axios';
import * as loginResources from './resources/login';
import * as refreshResources from './resources/refresh';
import * as logoutResources from './resources/logout';
import * as forgotPasswordResources from './resources/forgot-password';
import * as resetPasswordResources from './resources/reset-password';

export const login = async (req: loginResources.Request) =>
	await axios.post(loginResources.url(), req);

export const refresh = async () => await axios.post(refreshResources.url());

export const logout = async () => await axios.post(logoutResources.url());

export const forgotPassword = async (req: forgotPasswordResources.Request) =>
	await axios.get(forgotPasswordResources.url(req));

export const resetPassword = async (req: resetPasswordResources.Request) =>
	await axios.post(resetPasswordResources.url(), req);
