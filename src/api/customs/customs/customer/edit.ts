import { CUSTOMS_CUSTOMER_BASE_PATH } from '@/api/customs/common';

export type Request = {
	id: string;
	name: string;
	description: string;
	categoryId?: number;
};

export const url = () => `${CUSTOMS_CUSTOMER_BASE_PATH}`;
