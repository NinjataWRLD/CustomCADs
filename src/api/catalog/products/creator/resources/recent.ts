import { objectToSearchParams } from '@/utils/api';
import { Category, CREATOR_BASE_PATH } from '@/api/catalog/common';

export interface Request {
	limit: number;
}

export interface Response {
	id: string;
	name: string;
	uploadDate: string;
	status: string;
	category: Category;
}

export const url = (req: Request) =>
	`${CREATOR_BASE_PATH}?${objectToSearchParams(req)}`;
