import { COMPLETED_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderedAt: string;
	purchasedAt: string;
	delivery: boolean;
	designerName: string;
	shipmentId?: string;
}

export const url = (req: Request) =>
	`${COMPLETED_ORDERS_CLIENT_BASE_PATH}/${req.id}`;
