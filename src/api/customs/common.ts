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
