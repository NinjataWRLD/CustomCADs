import * as headers from '@/types/headers';
import * as payment from '@/api/common/payment';
import { ACTIVE_CART_BASE_PATH } from '../common';

export type Request = payment.Request & headers.IdempotencyKey;
export type Response = payment.Response;

export const url = () => `${ACTIVE_CART_BASE_PATH}/purchase`;
