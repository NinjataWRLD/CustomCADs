export type CartItemForDelivery = {
	forDelivery: true;
	productId: string;
	quantity: number;
	customizationId: string;
};

export type CartItemWithoutDelivery = {
	forDelivery: false;
	productId: string;
};

export type CartItem = CartItemForDelivery | CartItemWithoutDelivery;
