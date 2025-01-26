import { ONGOING_ORDERS_DESIGNER_BASE_PATH } from '@/api/orders/common';

export interface Request {
	id: string;
	contentType: string;
	fileName: string;
}

export interface Response {
	cadKey: string;
	cadUrl: string;
}

export const url = () =>
	`${ONGOING_ORDERS_DESIGNER_BASE_PATH}/presignedUrls/upload/cad`;
