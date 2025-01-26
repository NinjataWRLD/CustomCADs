import { CATEGORY_BASE_PATH } from '../../common';

export interface Request {
	id: number;
	name: string;
	description: string;
}

export const url = () => `${CATEGORY_BASE_PATH}`;
