import { CATEGORY_BASE_PATH } from '../common';

export interface Request {
	id: number;
}

export const url = (req: Request) => `${CATEGORY_BASE_PATH}/${req.id}`;
