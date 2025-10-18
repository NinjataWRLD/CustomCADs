import { MATERIALS_BASE_PATH } from '@/api/printing/common';

export type Request = {
	id: number;
	name: string;
	density: number;
	cost: number;
};

export const url = () => `${MATERIALS_BASE_PATH}`;
