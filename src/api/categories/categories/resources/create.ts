import { CATEGORY_BASE_PATH } from '../../common';

export interface Request {
	name: string;
	description: string;
}

export const url = () => `${CATEGORY_BASE_PATH}`;
