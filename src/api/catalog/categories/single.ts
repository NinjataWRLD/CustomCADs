import { CATEGORY_BASE_PATH } from '../common';

export type Request = {
	id: number;
};

export const url = (req: Request) => `${CATEGORY_BASE_PATH}/${req.id}`;
