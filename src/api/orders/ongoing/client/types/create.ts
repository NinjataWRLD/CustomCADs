export interface Request {
	name: string;
	description: string;
	delivery: boolean;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderDate: string;
	orderStatus: string;
	delivery: boolean;
}
