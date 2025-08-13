import { TAG_BASE_PATH } from '../common';

export type Request = {
	id: string;
};

export type Response = {
	id: string;
	name: string;
};

export const url = (req: Request) => `${TAG_BASE_PATH}/${req.id}`;
