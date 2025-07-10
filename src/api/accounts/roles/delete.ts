import { ROLES_BASE_PATH } from '../common';

export interface Request {
	id: number;
}

export const url = () => `${ROLES_BASE_PATH}`;
