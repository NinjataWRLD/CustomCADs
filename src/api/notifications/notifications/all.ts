import { NOTIFICATIONS_BASE_PATH } from '@/api/notifications/common';
import { objectToSearchParams } from '@/utils/api';

export type Request = {
	page: number;
	limit: number;
	status?: string;
	sortingType?: string;
	sortingDirection?: string;
};

export type Response = {
	id: string;
	type: string;
	status: string;
	createdAt: string;
	author: string;
	description: string;
	link?: string;
};

export const url = (req: Request) =>
	`${NOTIFICATIONS_BASE_PATH}?${objectToSearchParams(req)}`;
