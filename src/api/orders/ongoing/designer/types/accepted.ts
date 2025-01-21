import {
	OngoingOrderSorting,
	SortingDirection,
} from '@/api/common/enums/sortings';

export interface Request {
	delivery?: boolean;
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
	buyerName: string;
	delivery: boolean;
}
