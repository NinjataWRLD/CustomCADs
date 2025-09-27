import { CUSTOMS_ADMIN_BASE_PATH } from '@/api/customs/common';

export type Request = {
	id: string;
	categoryId: number;
};

export const url = () => `${CUSTOMS_ADMIN_BASE_PATH}/category`;
