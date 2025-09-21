import { CUSTOMS_ADMIN_BASE_PATH, CustomStatus } from '@/api/customs/common';
import { objectToSearchParams } from '@/utils/api';

export type Request = {
	forDelivery?: boolean;
	name?: string;
	status?: CustomStatus;
	customerId?: string;
	designerId?: string;
	categoryId?: number;
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
	buyerName: string;
	designerName?: string;
	categoryName?: string;
};

export const url = (req: Request) =>
	`${CUSTOMS_ADMIN_BASE_PATH}?${objectToSearchParams(req)}`;
