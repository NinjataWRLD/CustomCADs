export type ActiveCartItem = {
	quantity: number;
	forDelivery: boolean;
	addedAt: string;
	customizationId?: string;
	productId: string;
};

export type PurchasedCartItem = {
	quantity: number;
	forDelivery: boolean;
	addedAt: string;
	price: number;
	cost: number;
	productId: string;
	cartId: string;
	cadId: string;
	customizationId?: string;
};

export const ACTIVE_CART_BASE_PATH = '/carts/active';

export const PURCHASED_CART_BASE_PATH = '/carts/purchased';
