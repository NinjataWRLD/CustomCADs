import { objectToSearchParams } from '@/utils/api';
import { ONGOING_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Request {
	limit: number;
}

export interface Response {
	id: string;
	name: string;
	orderedAt: string;
	designerName: string;
}

export const url = (req: Request) =>
	`${ONGOING_ORDERS_CLIENT_BASE_PATH}/recent?${objectToSearchParams(req)}`;
