import { CUSTOMIZATIONS_BASE_PATH } from '@/api/customizations/common';

export interface Request {
	id: string;
}

export const url = () => `${CUSTOMIZATIONS_BASE_PATH}`;
