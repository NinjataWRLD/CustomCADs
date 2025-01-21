import { Address, Contact } from '@/api/delivery/common';

export interface Request {
	paymentMethodId: string;
	shipmentService: string;
	address: Address;
	contact: Contact;
}
