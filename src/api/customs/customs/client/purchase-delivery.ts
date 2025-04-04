import { Address, Contact } from '@/api/delivery/common';
import { CUSTOMS_CLIENT_BASE_PATH } from '@/api/customs/common';

export interface Request {
	id: string;
	paymentMethodId: string;
	shipmentService: string;
	count: number;
	address: Address;
	contact: Contact;
	customizationId: string;
}

export const url = () => `${CUSTOMS_CLIENT_BASE_PATH}/purchase-delivery`;
