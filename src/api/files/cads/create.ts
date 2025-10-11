import { CADS_BASE_PATH } from '../common';

export type Request = {
	generatedKey: string;
	contentType: string;
	volume: number;
};

export const url = () => `${CADS_BASE_PATH}`;
