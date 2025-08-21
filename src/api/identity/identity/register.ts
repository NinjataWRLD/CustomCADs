import { IDENTITY_BASE_PATH } from '../common';

export type Request = {
	role: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	firstName?: string;
	lastName?: string;
};

export const url = () => `${IDENTITY_BASE_PATH}/register`;
