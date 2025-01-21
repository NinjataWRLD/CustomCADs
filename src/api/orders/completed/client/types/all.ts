import {
	CompletedOrderSorting,
	SortingDirection,
} from '@/api/common/enums/sortings';

export interface Request {
	delivery?: boolean;
	name?: string;
	sortingType?: CompletedOrderSorting;
	sortingDirection?: SortingDirection;
	page: number;
	limit: number;
}

export interface Response {
	id: string;
	name: string;
	orderDate: string;
	purchaseDate: string;
	delivery: boolean;
}
