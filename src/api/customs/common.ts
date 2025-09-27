export type CustomStatus =
	| 'pending'
	| 'accepted'
	| 'begun'
	| 'finished'
	| 'reported'
	| 'removed';

export type CustomCategory = {
	id: number;
	name: string;
	setAt: string;
	setter: string;
};

export type AcceptedCustomDto = {
	designerName: string;
	acceptedAt: string;
};

export type FinishedCustomDto = {
	price: number;
	finishedAt: string;
	cadId: string;
};

export type CompletedCustomDto = {
	paymentStatus: string;
	customizationId?: string;
	shipmentId?: string;
};

export const CUSTOMS_CUSTOMER_BASE_PATH = 'customs/customer';

export const CUSTOMS_DESIGNER_BASE_PATH = 'customs/designer';

export const CUSTOMS_ADMIN_BASE_PATH = 'customs/admin';
