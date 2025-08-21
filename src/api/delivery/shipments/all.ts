import { Address, SHIPMENTS_BASE_PATH } from '@/api/delivery/common';
import { objectToSearchParams } from '@/utils/api';

export type Request = {
	sortingType?: string;
	sortingDirection?: string;
	page: number;
	limit: number;
};

export type Response = {
	id: string;
	buyerName: string;
	address: Address;
};

export const url = (req: Request) =>
	`${SHIPMENTS_BASE_PATH}?${objectToSearchParams(req)}`;
