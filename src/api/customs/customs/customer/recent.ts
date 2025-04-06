import { objectToSearchParams } from '@/utils/api';
import { CUSTOMS_CUSTOMER_BASE_PATH } from '@/api/customs/common';

export interface Request {
	limit: number;
}

export interface Response {
	id: string;
	name: string;
	orderedAt: string;
	designerName?: string;
}

export const url = (req: Request) =>
	`${CUSTOMS_CUSTOMER_BASE_PATH}/recent?${objectToSearchParams(req)}`;
