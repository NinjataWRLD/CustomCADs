import { CREATOR_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	id: string;
};

export const url = () => `${CREATOR_BASE_PATH}`;
