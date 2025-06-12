export interface AcceptedCustomDto {
	designerName: string;
	acceptedAt: string;
}

export interface FinishedCustomDto {
	price: number;
	finishedAt: string;
	cadId: string;
}

export interface CompletedCustomDto {
	paymentStatus: string;
	customizationId?: string;
	shipmentId?: string;
}

export const CUSTOMS_CUSTOMER_BASE_PATH = 'customs/customer';

export const CUSTOMS_DESIGNER_BASE_PATH = 'customs/designer';
