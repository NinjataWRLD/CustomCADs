import { ROLES_BASE_PATH } from '../common';

export interface Request {
	id: number;
}

export const url = (req: Request) => `${ROLES_BASE_PATH}/${req.id}`;
