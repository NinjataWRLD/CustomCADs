import { ACTIVE_CART_BASE_PATH, ActiveCartItem } from '@/api/carts/common';

export type Response = ActiveCartItem[];

export const url = () => `${ACTIVE_CART_BASE_PATH}`;
