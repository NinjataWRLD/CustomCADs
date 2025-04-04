import { ACTIVE_CART_BASE_PATH } from '@/api/carts/common';

export interface Request {
	productId: string;
	forDelivery: boolean;
	customizationId?: string;
}

export const url = () => `${ACTIVE_CART_BASE_PATH}`;
