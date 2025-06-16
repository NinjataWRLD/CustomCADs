import { ACTIVE_CART_BASE_PATH } from '@/api/carts/common';

export type Response = number;

export const url = () => `${ACTIVE_CART_BASE_PATH}/count`;
