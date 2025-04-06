import { CUSTOMS_CUSTOMER_BASE_PATH } from '@/api/customs/common';

export interface Request {
	name: string;
	description: string;
	forDelivery: boolean;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderedAt: string;
	status: string;
	forDelivery: boolean;
}

export const url = () => `${CUSTOMS_CUSTOMER_BASE_PATH}`;
