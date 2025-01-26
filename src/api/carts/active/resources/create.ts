import { ACTIVE_CART_BASE_PATH } from '../../common';

export interface Response {
	id: string;
	buyerName: string;
}

export const url = () => `${ACTIVE_CART_BASE_PATH}`;
