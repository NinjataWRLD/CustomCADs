import { IDENTITY_BASE_PATH } from '../common';

export interface Request {
	username: string;
}

export const url = () => `${IDENTITY_BASE_PATH}/username`;
