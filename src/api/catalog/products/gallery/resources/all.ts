import objectToUrl from '@/utils/object-to-url';
import { GALLERY_BASE_PATH } from '@/api/catalog/common';

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
	category: string;
	views: number;
}

export const url = (req: Request) => `${GALLERY_BASE_PATH}?${objectToUrl(req)}`;
