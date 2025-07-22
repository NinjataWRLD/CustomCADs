import * as headers from '@/types/headers';
import { Address, Contact } from '@/api/delivery/common';
import * as payment from '@/api/common/payment';
import { CUSTOMS_CUSTOMER_BASE_PATH } from '@/api/customs/common';

export type Request = {
	id: string;
	shipmentService: string;
	count: number;
	address: Address;
	contact: Contact;
	customizationId: string;
} & payment.Request &
	headers.IdempotencyKey;
export type Response = payment.Response;

export const url = () => `${CUSTOMS_CUSTOMER_BASE_PATH}/purchase-delivery`;
