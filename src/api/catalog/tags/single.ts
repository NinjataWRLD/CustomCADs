import { TAG_BASE_PATH } from '../common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
}

export const url = (req: Request) => `${TAG_BASE_PATH}/${req.id}`;
