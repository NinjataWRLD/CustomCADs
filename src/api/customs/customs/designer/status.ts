import { CUSTOMS_DESIGNER_BASE_PATH } from '@/api/customs/common';

export type Request = {
	id: string;
};

export const url = (status: 'accept' | 'cancel' | 'begin' | 'report') =>
	`${CUSTOMS_DESIGNER_BASE_PATH}/${status}`;
