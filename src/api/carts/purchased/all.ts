import { objectToSearchParams } from '@/utils/api';
import { PURCHASED_CART_BASE_PATH } from '../common';

export interface Request {
	sortingType?: string;
	sortingDirection?: string;
	paymentStatus?: string;
	page: number;
	limit: number;
}

export interface Response {
	id: string;
	total: number;
	purchasedAt: string;
	itemsCount: number;
}

export const url = (req: Request) =>
	`${PURCHASED_CART_BASE_PATH}?${objectToSearchParams(req)}`;
