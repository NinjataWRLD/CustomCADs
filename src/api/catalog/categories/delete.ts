import { CATEGORY_BASE_PATH } from '../common';

export interface Request {
	id: number;
}

export const url = () => `${CATEGORY_BASE_PATH}`;
