import { Address, SHIPMENTS_BASE_PATH } from '@/api/delivery/common';
import objectToUrl from '@/utils/object-to-url';

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
	`${SHIPMENTS_BASE_PATH}?${objectToUrl(req)}`;
