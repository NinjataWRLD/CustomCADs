export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderDate: string;
	purchaseDate: string;
	delivery: boolean;
	buyerName: string;
	shipmentId?: string;
}
