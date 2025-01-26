import { Address, Contact } from '@/api/delivery/common';
import { ONGOING_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Request {
	id: string;
	paymentMethodId: string;
	shipmentService: string;
	weight: number;
	count: number;
	address: Address;
	contact: Contact;
}

export const url = () => `${ONGOING_ORDERS_CLIENT_BASE_PATH}/purchase-delivery`;
