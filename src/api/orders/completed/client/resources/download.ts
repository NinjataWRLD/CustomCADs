import { COMPLETED_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Request {
	id: string;
}

export interface Response {
	presignedUrl: string;
}

export const url = () =>
	`${COMPLETED_ORDERS_CLIENT_BASE_PATH}/presignedUrls/download/cad`;
