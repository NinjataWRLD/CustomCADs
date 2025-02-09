import objectToUrl from '@/utils/object-to-url';
import { Category, CREATOR_BASE_PATH } from '@/api/catalog/common';

export interface Request {
	categoryId?: number;
	name?: string;
	sortingType?: string;
	sortingDirection?: string;
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
