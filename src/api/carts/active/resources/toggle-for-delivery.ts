import { ACTIVE_CART_BASE_PATH } from '../../common';

export interface Request {
	itemId: string;
	value: boolean;
}

export const url = () => `${ACTIVE_CART_BASE_PATH}/delivery`;
