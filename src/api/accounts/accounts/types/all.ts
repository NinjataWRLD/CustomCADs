import { AccountSorting, SortingDirection } from '@/api/common/enums/sortings';

export interface Request {
	name?: string;
	sortingType?: AccountSorting;
	sortingDirection?: SortingDirection;
	page: number;
	limit: number;
}
