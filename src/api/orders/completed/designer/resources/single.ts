import { COMPLETED_ORDERS_DESIGNER_BASE_PATH } from '@/api/orders/common';

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
	buyerName: string;
	shipmentId?: string;
}

export const url = (req: Request) =>
	`${COMPLETED_ORDERS_DESIGNER_BASE_PATH}/${req.id}`;
