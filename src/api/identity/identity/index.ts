import { axios, config } from '@/api/axios';
import * as authnResources from './authn';
import * as authzResources from './authz';
import * as myAccountResources from './my-account';
import * as downloadInfoResources from './download-info';
import * as loginResources from './login';
import * as refreshResources from './refresh';
import * as logoutResources from './logout';
import * as deleteResources from './delete';
import * as changeUsernameResources from './change-username';
import * as toggleTrackViewedProductsResources from './toggle-track-viewed-products';
import * as forgotPasswordResources from './forgot-password';
import * as resetPasswordResources from './reset-password';
import * as registerResources from './register';
import * as confirmEmailResources from './confirm-email';
import * as retryConfirmEmailResources from './retry-confirm-email';

export const authn = async () =>
	await axios.get<authnResources.Response>(authnResources.url());

export const authz = async () =>
	await axios.get<authzResources.Response>(authzResources.url());

export const myAccount = async () =>
	await axios.get<myAccountResources.Response>(myAccountResources.url());

export const downloadInfo = async () =>
	await axios.get<downloadInfoResources.Response>(
		downloadInfoResources.url(),
	);

export const login = async (req: loginResources.Request) =>
	await axios.post(
		loginResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const refresh = async (req: refreshResources.Request) =>
	await axios.post(
		refreshResources.url(),
		undefined,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const logout = async () => await axios.post(logoutResources.url());

export const changeUsername = async (req: changeUsernameResources.Request) =>
	await axios.patch(changeUsernameResources.url(), req);

export const toggleTrackViewedProducts = async () =>
	await axios.patch(toggleTrackViewedProductsResources.url());

export const delete_ = async () => await axios.delete(deleteResources.url());

export const forgotPassword = async (req: forgotPasswordResources.Request) =>
	await axios.post(
		forgotPasswordResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const resetPassword = async (req: resetPasswordResources.Request) =>
	await axios.post(resetPasswordResources.url(), req);

export const register = async (req: registerResources.Request) =>
	await axios.post(registerResources.url(), req);

export const confirmEmail = async (req: confirmEmailResources.Request) =>
	await axios.post(
		confirmEmailResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const retryConfirmEmail = async (
	req: retryConfirmEmailResources.Request,
) =>
	await axios.post(
		retryConfirmEmailResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);
