import objectToUrl from '@/utils/object-to-url';
import { ProductSorting, SortingDirection } from '@/api/common/enums/sortings';
import { Category, DESIGNER_BASE_PATH } from '@/api/catalog/common';

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
	uploadDate: string;
	creatorName: string;
	category: Category;
}

export const url = (
	req: Request,
	status: 'unchecked' | 'validated' | 'reported',
) => `${DESIGNER_BASE_PATH}/${status}?${objectToUrl(req)}`;
