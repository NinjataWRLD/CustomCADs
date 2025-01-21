export interface Request {
	productId: string;
	weight: number;
	forDelivery: boolean;
}

export interface Response {
	id: string;
	quantity: number;
	forDelivery: boolean;
	weight: number;
	productId: string;
	cartId: string;
}
