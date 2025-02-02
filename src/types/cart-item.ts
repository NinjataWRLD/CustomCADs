export interface CartItem {
	productId: string;
}

export interface CartDeliveryItem {
	productId: string;
	weight: number;
	quantity: number;
}
