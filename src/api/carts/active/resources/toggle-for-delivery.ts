import { ACTIVE_CART_BASE_PATH } from '../../common';

export interface Request {
	itemId: string;
}

export const url = () => `${ACTIVE_CART_BASE_PATH}/delivery`;
