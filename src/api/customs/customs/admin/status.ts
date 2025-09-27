import { CUSTOMS_ADMIN_BASE_PATH } from '@/api/customs/common';

export type Request = {
	id: string;
};

export const url = (status: 'remove') => `${CUSTOMS_ADMIN_BASE_PATH}/${status}`;
