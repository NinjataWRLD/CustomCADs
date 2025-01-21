export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderDate: string;
	orderStatus: string;
	delivery: boolean;
	designerName?: string;
}
