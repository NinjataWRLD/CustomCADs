import { ACTIVE_CART_BASE_PATH } from '../common';

export interface Request {
	productId: string;
}

export const url = () => `${ACTIVE_CART_BASE_PATH}`;
