import { objectToSearchParams } from '@/utils/api';
import { ONGOING_ORDERS_DESIGNER_BASE_PATH } from '@/api/orders/common';

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
	orderedAt: string;
	buyerName: string;
	delivery: boolean;
}

export const url = (
	req: Request,
	status: 'pending' | 'accepted' | 'begun' | 'finished' | 'reported',
) =>
	`${ONGOING_ORDERS_DESIGNER_BASE_PATH}/${status}?${objectToSearchParams(req)}`;
