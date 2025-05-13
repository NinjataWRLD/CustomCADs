import { Address, Contact } from '@/api/delivery/common';
import * as payment from '@/api/common/payment';
import { ACTIVE_CART_BASE_PATH } from '../common';

export type Request = {
	shipmentService: string;
	address: Address;
	contact: Contact;
} & payment.Request;
export type Response = payment.Response;

export const url = () => `${ACTIVE_CART_BASE_PATH}/purchase-delivery`;
