import { Address, Contact } from '@/api/delivery/common';
import { ONGOING_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Request {
	id: string;
	paymentMethodId: string;
	shipmentService: string;
	count: number;
	address: Address;
	contact: Contact;
	customizationId: string;
}

export const url = () => `${ONGOING_ORDERS_CLIENT_BASE_PATH}/purchase-delivery`;
