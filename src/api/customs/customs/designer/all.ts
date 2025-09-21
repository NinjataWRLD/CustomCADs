import { CUSTOMS_DESIGNER_BASE_PATH, CustomStatus } from '@/api/customs/common';
import { objectToSearchParams } from '@/utils/api';

export type Request = {
	forDelivery?: boolean;
	status?: CustomStatus;
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
	status: CustomStatus;
	orderedAt: string;
	forDelivery: boolean;
	buyerName: string;
	categoryName?: string;
};

export const url = (req: Request) =>
	`${CUSTOMS_DESIGNER_BASE_PATH}?${objectToSearchParams(req)}`;
