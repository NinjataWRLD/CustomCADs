import { SHIPMENTS_BASE_PATH } from '../common';

export type Request = {
	id: string;
	comment: string;
};

export const url = () => `${SHIPMENTS_BASE_PATH}`;
