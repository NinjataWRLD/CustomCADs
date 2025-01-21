import {
	OngoingOrderSorting,
	SortingDirection,
} from '@/api/common/enums/sortings';

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
