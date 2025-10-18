import { IMAGES_BASE_PATH } from '../common';

export type Request = {
	id: string;
	contentType: string;
};

export const url = () => `${IMAGES_BASE_PATH}`;
