import { objectToSearchParams } from '@/utils/api';
import { GALLERY_BASE_PATH } from '@/api/catalog/common';

export interface Request {
	categoryId?: number;
	name?: string;
	sortingType?: string;
	sortingDirection?: string;
	tagIds?: string[];
	page: number;
	limit: number;
}

export interface Response {
	id: string;
	name: string;
	tags: string[];
	category: string;
	views: number;
}

export const url = (req: Request) =>
	`${GALLERY_BASE_PATH}?${objectToSearchParams(req)}`;
