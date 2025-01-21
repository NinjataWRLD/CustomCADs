import { ProductSorting, SortingDirection } from '@/api/common/enums/sortings';

export interface Request {
	categoryId?: number;
	name?: string;
	sortingType?: ProductSorting;
	sortingDirection?: SortingDirection;
	page: number;
	limit: number;
}

export interface Response {
	id: string;
	name: string;
}
