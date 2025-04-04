import { ACTIVE_CART_BASE_PATH } from '../common';

export interface Request {
	productId: string;
	customizationId?: string;
}

export const url = () => `${ACTIVE_CART_BASE_PATH}/delivery`;
