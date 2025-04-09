import { ACCOUNTS_BASE_PATH } from '../common';

export interface Request {
	role: string;
	username: string;
	email: string;
	timeZone: string;
	password: string;
	firstName?: string;
	lastName?: string;
}

export const url = () => `${ACCOUNTS_BASE_PATH}`;
