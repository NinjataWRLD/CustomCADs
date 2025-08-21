import { TAG_BASE_PATH } from '../common';

export type Response = {
	id: string;
	name: string;
};

export const url = () => `${TAG_BASE_PATH}`;
