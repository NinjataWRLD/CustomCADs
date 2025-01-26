import { ACTIVE_CART_BASE_PATH } from '../../common';

export interface Request {
	itemId: string;
	amount: number;
}

export const url = (action: 'increase' | 'decrease') =>
	`${ACTIVE_CART_BASE_PATH}/${action}`;
