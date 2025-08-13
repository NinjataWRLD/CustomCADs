import { objectToSearchParams } from '@/utils/api';
import { CategoryDto, CREATOR_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	limit: number;
};

export type Response = {
	id: string;
	name: string;
	uploadedAt: string;
	status: string;
	category: CategoryDto;
};

export const url = (req: Request) =>
	`${CREATOR_BASE_PATH}?${objectToSearchParams(req)}`;
