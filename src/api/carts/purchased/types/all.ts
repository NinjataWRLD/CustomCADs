import { CartSorting, SortingDirection } from '@/api/common/enums/sortings';

export interface Request {
	sortingType: CartSorting;
	sortingDirectoin: SortingDirection;
	page: number;
	limit: number;
}

export interface Response {
	id: string;
	total: number;
	purchaseDate: string;
	itemsCount: number;
}
