export interface ActiveCartItem {
	quantity: number;
	forDelivery: boolean;
	addedAt: string;
	customizationId?: string;
	productId: string;
}

export interface PurchasedCartItem {
	quantity: number;
	forDelivery: boolean;
	addedAt: string;
	price: number;
	cost: number;
	customizationId?: string;
	productId: string;
	cartId: string;
}

export const ACTIVE_CART_BASE_PATH = '/carts/active';

export const PURCHASED_CART_BASE_PATH = '/carts/purchased';
