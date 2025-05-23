import { IDENTITY_BASE_PATH } from '../common';

export interface Request {
	email: string;
	token: string;
	newPassword: string;
}

export const url = () => `${IDENTITY_BASE_PATH}/password/reset`;
