import { ROLES_BASE_PATH } from '../common';

export type Request = {
	id: number;
};

export const url = (req: Request) => `${ROLES_BASE_PATH}/${req.id}`;
