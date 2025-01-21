import { ProductSorting, SortingDirection } from '@/api/common/enums/sortings';
import { Category } from '@/api/catalog/common';

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
	creatorName: string;
	uploadDate: string;
	category: Category;
}
