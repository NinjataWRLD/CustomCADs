import { MATERIALS_BASE_PATH } from '@/api/printing/common';

export type Request = {
	id: number;
	name: string;
	density: number;
	cost: number;
	textureKey?: string;
	textureContentType?: string;
};

export const url = () => `${MATERIALS_BASE_PATH}`;
