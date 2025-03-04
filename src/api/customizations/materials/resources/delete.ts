import { MATERIALS_BASE_PATH } from '@/api/customizations/common';

export interface Request {
	id: number;
}

export const url = () => `${MATERIALS_BASE_PATH}`;
