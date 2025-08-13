import { PURCHASED_CART_BASE_PATH } from '../common';

export type Response = {
	total: number;
	counts: Record<string, number>;
};

export const url = () => `${PURCHASED_CART_BASE_PATH}/stats`;
