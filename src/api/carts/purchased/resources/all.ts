import { objectToSearchParams } from '@/utils/api';
import { PURCHASED_CART_BASE_PATH } from '../../common';

export interface Request {
	sortingType: string;
	sortingDirectoin: string;
	page: number;
	limit: number;
}

export interface Response {
	id: string;
	total: number;
	purchaseDate: string;
	itemsCount: number;
}

export const url = (req: Request) =>
	`${PURCHASED_CART_BASE_PATH}?${objectToSearchParams(req)}`;
