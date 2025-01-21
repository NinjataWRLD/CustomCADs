export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderDate: string;
	status: string;
	delivery: boolean;
	buyerName: string;
}
