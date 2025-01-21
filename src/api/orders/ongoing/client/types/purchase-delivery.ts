import { Address, Contact } from '@/api/delivery/common';

export interface Request {
	id: string;
	paymentMethodId: string;
	shipmentService: string;
	weight: number;
	count: number;
	address: Address;
	contact: Contact;
}
