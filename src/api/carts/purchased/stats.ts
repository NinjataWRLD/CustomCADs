import { PURCHASED_CART_BASE_PATH } from '../common';

export interface Response {
	total: number;
	counts: Record<string, number>;
}

export const url = () => `${PURCHASED_CART_BASE_PATH}/stats`;
