import { CUSTOMIZATIONS_BASE_PATH } from '@/api/printing/common';

export type Request = {
	id: string;
	scale: number;
	infill: number;
	volume: number;
	color: string;
	materialId: number;
};

export const url = () => `${CUSTOMIZATIONS_BASE_PATH}`;
