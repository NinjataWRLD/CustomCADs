export interface ActiveCartItem {
	id: string;
	quantity: number;
	forDelivery: boolean;
	weight: number;
	productId: string;
	cartId: string;
}

export interface PurchasedCartItem {
	id: string;
	quantity: number;
	forDelivery: boolean;
	price: number;
	cost: number;
	productId: string;
	cartId: string;
}
