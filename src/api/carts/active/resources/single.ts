import { ACTIVE_CART_BASE_PATH, ActiveCartItem } from '@/api/carts/common';

export interface Response {
	id: string;
	buyerName: string;
	items: ActiveCartItem[];
}

export const url = () => `${ACTIVE_CART_BASE_PATH}`;
