import { TAG_BASE_PATH } from '../../common';

export interface Request {
	id: string;
}

export const url = () => `${TAG_BASE_PATH}`;
