import objectToUrl from '@/utils/object-to-url';
import { GALLERY_BASE_PATH } from '@/api/catalog/common';
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

export const url = (req: Request) => `${GALLERY_BASE_PATH}?${objectToUrl(req)}`;
