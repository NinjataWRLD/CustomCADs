import objectToSearchParams from '@/utils/object-to-search-params';
import { ONGOING_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Request {
	limit: number;
}

export interface Response {
	id: string;
	name: string;
	orderDate: string;
	designerName: string;
}

export const url = (req: Request) =>
	`${ONGOING_ORDERS_CLIENT_BASE_PATH}/recent?${objectToSearchParams(req)}`;
