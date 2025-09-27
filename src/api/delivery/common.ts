export type Address = {
	country: string;
	city: string;
	street: string;
};

export type Info = {
	count: number;
	weight: number;
	recipient: string;
};

export type Contact = {
	phone: string;
	email: string;
};

export const SHIPMENTS_BASE_PATH = '/shipments';
