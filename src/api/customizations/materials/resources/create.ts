import { MATERIALS_BASE_PATH } from '@/api/customizations/common';

export interface Request {
	name: string;
	density: number;
	cost: number;
	textureKey: string;
	textureContentType: string;
}

export const url = () => `${MATERIALS_BASE_PATH}`;
