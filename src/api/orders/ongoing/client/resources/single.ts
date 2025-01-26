import { ONGOING_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderDate: string;
	orderStatus: string;
	delivery: boolean;
	designerName?: string;
}

export const url = (req: Request) =>
	`${ONGOING_ORDERS_CLIENT_BASE_PATH}/${req.id}`;
