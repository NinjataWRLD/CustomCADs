import { DESIGNER_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	id: string;
};

export const url = () => `${DESIGNER_BASE_PATH}/validate`;
