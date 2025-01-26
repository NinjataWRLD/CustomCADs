import objectToUrl from '@/utils/object-to-url';
import { ProductSorting, SortingDirection } from '@/api/common/enums/sortings';
import { Category, CREATOR_BASE_PATH } from '@/api/catalog/common';

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

export const url = (req: Request) => `${CREATOR_BASE_PATH}?${objectToUrl(req)}`;
