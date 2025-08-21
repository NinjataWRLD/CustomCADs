import { objectToSearchParams } from '@/utils/api';
import { CategoryDto, CREATOR_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	categoryId?: number;
	name?: string;
	sortingType?: string;
	sortingDirection?: string;
	page: number;
	limit: number;
};

export type Response = {
	id: string;
	name: string;
	creatorName: string;
	uploadedAt: string;
	category: CategoryDto;
};

export const url = (req: Request) =>
	`${CREATOR_BASE_PATH}?${objectToSearchParams(req)}`;
