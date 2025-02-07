import objectToUrl from '@/utils/object-to-url';
import { COMPLETED_ORDERS_DESIGNER_BASE_PATH } from '@/api/orders/common';

export interface Request {
	delivery?: boolean;
	name?: string;
	sortingType?: string;
	sortingDirection?: string;
	page: number;
	limit: number;
}

export interface Response {
	id: string;
	name: string;
	orderDate: string;
	purchaseDate: string;
	buyerName: string;
	delivery: boolean;
}

export const url = (req: Request) =>
	`${COMPLETED_ORDERS_DESIGNER_BASE_PATH}?${objectToUrl(req)}`;
