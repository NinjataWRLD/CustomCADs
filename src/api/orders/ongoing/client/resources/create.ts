import { ONGOING_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Request {
	name: string;
	description: string;
	delivery: boolean;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderedAt: string;
	orderStatus: string;
	delivery: boolean;
}

export const url = () => `${ONGOING_ORDERS_CLIENT_BASE_PATH}`;
