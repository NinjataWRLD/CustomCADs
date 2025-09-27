import * as headers from '@/types/headers';
import {
	CustomCategory,
	CUSTOMS_CUSTOMER_BASE_PATH,
} from '@/api/customs/common';

export type Request = {
	name: string;
	description: string;
	forDelivery: boolean;
	categoryId?: number;
} & headers.IdempotencyKey;

export type Response = {
	id: string;
	name: string;
	description: string;
	orderedAt: string;
	forDelivery: boolean;
	status: string;
	category?: CustomCategory;
};

export const url = () => `${CUSTOMS_CUSTOMER_BASE_PATH}`;
