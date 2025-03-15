import { objectToSearchParams } from '@/utils/api';
import { Category, DESIGNER_BASE_PATH } from '@/api/catalog/common';

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
	uploadDate: string;
	creatorName: string;
	category: Category;
}

export const url = (
	req: Request,
	status: 'unchecked' | 'validated' | 'reported',
) => `${DESIGNER_BASE_PATH}/${status}?${objectToSearchParams(req)}`;
