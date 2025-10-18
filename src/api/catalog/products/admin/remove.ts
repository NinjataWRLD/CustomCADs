import { ADMIN_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	id: string;
};

export const url = () => `${ADMIN_BASE_PATH}/remove`;
