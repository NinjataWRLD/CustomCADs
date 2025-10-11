import { IMAGES_BASE_PATH } from '../common';

export type Request = {
	generatedKey: string;
	contentType: string;
};

export const url = () => `${IMAGES_BASE_PATH}`;
