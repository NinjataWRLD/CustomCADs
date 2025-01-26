import { ONGOING_ORDERS_DESIGNER_BASE_PATH } from '@/api/orders/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderDate: string;
	status: string;
	delivery: boolean;
	buyerName: string;
}
export const url = (req: Request) =>
	`${ONGOING_ORDERS_DESIGNER_BASE_PATH}/${req.id}`;
