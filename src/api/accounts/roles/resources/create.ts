import { ROLES_BASE_PATH } from '../../common';

export interface Request {
	name: string;
	description: string;
}

export const url = () => `${ROLES_BASE_PATH}`;
