import { ACTIVE_CART_BASE_PATH } from '../common';

export interface Request {
	paymentMethodId: string;
}

export const url = () => `${ACTIVE_CART_BASE_PATH}/purchase`;
