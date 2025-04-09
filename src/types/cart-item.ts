export interface CartItemForDelivery {
	forDelivery: true;
	productId: string;
	quantity: number;
	customizationId: string;
}

export interface CartItemWithoutDelivery {
	forDelivery: false;
	productId: string;
}

export type CartItem = CartItemForDelivery | CartItemWithoutDelivery;
