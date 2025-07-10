import { ACCOUNTS_BASE_PATH } from '../common';

export interface Request {
	id: string;
}

export const url = () => `${ACCOUNTS_BASE_PATH}`;
