import { IDENTITY_BASE_PATH } from '../common';

export interface Response {
	id: string;
	role: string;
	username: string;
	firstName?: string;
	lastName?: string;
	email: string;
	createdAt: string;
}

export const url = () => `${IDENTITY_BASE_PATH}/my-account`;
