import { ROLES_BASE_PATH } from '../../common';

export interface Request {
	name: string;
}

export const url = (req: Request) => `${ROLES_BASE_PATH}/${req.name}`;
