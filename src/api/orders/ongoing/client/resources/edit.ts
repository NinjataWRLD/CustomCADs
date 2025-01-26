import { ONGOING_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Request {
	id: string;
	name: string;
	description: string;
}

export const url = () => `${ONGOING_ORDERS_CLIENT_BASE_PATH}`;
