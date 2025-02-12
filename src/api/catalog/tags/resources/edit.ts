import { TAG_BASE_PATH } from '../../common';

export interface Request {
	id: string;
	name: string;
}

export const url = () => `${TAG_BASE_PATH}`;
