import { COMPLETED_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export type Response = string[];

export const url = () => `${COMPLETED_ORDERS_CLIENT_BASE_PATH}/sortings`;
