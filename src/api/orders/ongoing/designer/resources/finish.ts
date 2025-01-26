import { ONGOING_ORDERS_DESIGNER_BASE_PATH } from '@/api/orders/common';

export interface Request {
	id: string;
	price: number;
	cadKey: string;
	cadContentType: string;
}

export const url = () => `${ONGOING_ORDERS_DESIGNER_BASE_PATH}/finished`;
