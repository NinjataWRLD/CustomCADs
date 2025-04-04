import { IDENTITY_BASE_PATH } from '../common';

export interface Request {
	username: string;
	password: string;
	rememberMe?: boolean;
}

export const url = () => `${IDENTITY_BASE_PATH}/login`;
