import { ACCOUNTS_BASE_PATH } from '../common';

export interface Request {
	id: string;
}

export const url = (req: Request) => `${ACCOUNTS_BASE_PATH}/${req.id}`;
