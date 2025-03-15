import { SIGNUP_BASE_PATH } from '../../common';

export interface Request {
	role: string;
	username: string;
	email: string;
	timeZone: string;
	password: string;
	confirmPassword: string;
	firstName?: string;
	lastName?: string;
}

export const url = () => `${SIGNUP_BASE_PATH}/register`;
