import { objectToSearchParams } from '@/utils/api';
import { CategoryDto, DESIGNER_BASE_PATH } from '@/api/catalog/common';

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
	uploadedAt: string;
	creatorName: string;
	category: CategoryDto;
};

export const url = (
	req: Request,
	status: 'unchecked' | 'validated' | 'reported',
) => `${DESIGNER_BASE_PATH}/${status}?${objectToSearchParams(req)}`;
