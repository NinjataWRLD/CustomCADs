import { objectToSearchParams } from '@/utils/api';
import { CUSTOMS_CUSTOMER_BASE_PATH, CustomStatus } from '@/api/customs/common';

export type Request = {
	delivery?: boolean;
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
	orderedAt: string;
	status: CustomStatus;
	forDelivery: boolean;
	designerName?: string;
	categoryName?: string;
};

export const url = (req: Request) =>
	`${CUSTOMS_CUSTOMER_BASE_PATH}?${objectToSearchParams(req)}`;
