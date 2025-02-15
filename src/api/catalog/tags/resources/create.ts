import { TAG_BASE_PATH } from '../../common';

export interface Request {
	name: string;
}

export interface Response {
	id: string;
	name: string;
}

export const url = () => `${TAG_BASE_PATH}`;
