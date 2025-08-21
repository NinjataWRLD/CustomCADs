import * as headers from '@/types/headers';
import { CUSTOMS_CUSTOMER_BASE_PATH } from '@/api/customs/common';

export type Request = {
	name: string;
	description: string;
	forDelivery: boolean;
} & headers.IdempotencyKey;

export type Response = {
	id: string;
	name: string;
	description: string;
	orderedAt: string;
	status: string;
	forDelivery: boolean;
};

export const url = () => `${CUSTOMS_CUSTOMER_BASE_PATH}`;
