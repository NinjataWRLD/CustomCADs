import { ROLES_BASE_PATH } from '../common';

export type Request = {
	id: number;
};

export const url = () => `${ROLES_BASE_PATH}`;
