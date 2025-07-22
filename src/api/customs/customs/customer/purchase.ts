import * as headers from '@/types/headers';
import * as payment from '@/api/common/payment';
import { CUSTOMS_CUSTOMER_BASE_PATH } from '@/api/customs/common';

export type Request = {
	id: string;
} & payment.Request &
	headers.IdempotencyKey;
export type Response = payment.Response;

export const url = () => `${CUSTOMS_CUSTOMER_BASE_PATH}/purchase`;
