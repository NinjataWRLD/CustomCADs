import { PURCHASED_CART_BASE_PATH } from '../../common';

export interface Request {
	id: string;
	itemId: string;
}

export interface Response {
	presignedUrl: string;
}

export const url = () => `${PURCHASED_CART_BASE_PATH}`;
