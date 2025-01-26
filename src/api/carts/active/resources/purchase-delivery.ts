import { Address, Contact } from '@/api/delivery/common';
import { ACTIVE_CART_BASE_PATH } from '../../common';

export interface Request {
	paymentMethodId: string;
	shipmentService: string;
	address: Address;
	contact: Contact;
}

export const url = () => `${ACTIVE_CART_BASE_PATH}/purchase-delivery`;
