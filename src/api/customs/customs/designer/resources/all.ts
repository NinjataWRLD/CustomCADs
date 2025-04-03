import { CUSTOMS_DESIGNER_BASE_PATH } from '@/api/customs/common';
import { objectToSearchParams } from '@/utils/api';

export interface Request {
	status?: 'pending' | 'accepted' | 'begun' | 'finished' | 'reported';
	forDelivery?: boolean;
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
	forDelivery: boolean;
}

export const url = (req: Request) =>
	`${CUSTOMS_DESIGNER_BASE_PATH}?${objectToSearchParams(req)}`;
