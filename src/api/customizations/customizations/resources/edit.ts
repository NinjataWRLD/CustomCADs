import { CUSTOMIZATIONS_BASE_PATH } from '@/api/customizations/common';

export interface Request {
	id: string;
	scale: number;
	infill: number;
	volume: number;
	color: string;
	materialId: number;
}

export const url = () => `${CUSTOMIZATIONS_BASE_PATH}`;
