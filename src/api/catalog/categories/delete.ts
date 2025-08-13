import { CATEGORY_BASE_PATH } from '../common';

export type Request = {
	id: number;
};

export const url = () => `${CATEGORY_BASE_PATH}`;
