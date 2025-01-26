import { ONGOING_ORDERS_DESIGNER_BASE_PATH } from '@/api/orders/common';

export interface Request {
	id: string;
}

export const url = (status: 'accept' | 'cancel' | 'begin' | 'report') =>
	`${ONGOING_ORDERS_DESIGNER_BASE_PATH}/${status}`;
