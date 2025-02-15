import { Address, SHIPMENTS_BASE_PATH } from '@/api/delivery/common';
import objectToSearchParams from '@/utils/object-to-search-params';

export interface Request {
	sortingType?: string;
	sortingDirection?: string;
	page: number;
	limit: number;
}

export interface Response {
	id: string;
	buyerName: string;
	address: Address;
}

export const url = (req: Request) =>
	`${SHIPMENTS_BASE_PATH}?${objectToSearchParams(req)}`;
