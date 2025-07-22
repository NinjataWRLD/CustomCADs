import * as headers from '@/types/headers';
import { ACTIVE_CART_BASE_PATH } from '@/api/carts/common';

export type Request = {
	productId: string;
	forDelivery: boolean;
	customizationId?: string;
} & headers.IdempotencyKey;

export const url = () => `${ACTIVE_CART_BASE_PATH}`;
