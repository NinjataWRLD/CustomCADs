import objectToUrl from '@/utils/object-to-url';
import {
	OngoingOrderSorting,
	SortingDirection,
} from '@/api/common/enums/sortings';
import { ONGOING_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Request {
	delivery?: boolean;
	orderStatus?: string;
	name?: string;
	sortingType?: OngoingOrderSorting;
	sortingDirection?: SortingDirection;
	page: number;
	limit: number;
}

export interface Response {
	id: string;
	name: string;
	orderDate: string;
	orderStatus: string;
	delivery: boolean;
}

export const url = (req: Request) =>
	`${ONGOING_ORDERS_CLIENT_BASE_PATH}?${objectToUrl(req)}`;
