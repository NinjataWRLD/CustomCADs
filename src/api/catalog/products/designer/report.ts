import { DESIGNER_BASE_PATH } from '@/api/catalog/common';

export interface Request {
	id: string;
}

export const url = () => `${DESIGNER_BASE_PATH}/report`;
