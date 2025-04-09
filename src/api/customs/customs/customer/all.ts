import { objectToSearchParams } from '@/utils/api';
import { CUSTOMS_CUSTOMER_BASE_PATH } from '@/api/customs/common';

export interface Request {
	delivery?: boolean;
	status?: string;
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
	status: string;
	forDelivery: boolean;
}

export const url = (req: Request) =>
	`${CUSTOMS_CUSTOMER_BASE_PATH}?${objectToSearchParams(req)}`;
