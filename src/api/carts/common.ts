export interface ActiveCartItem {
	quantity: number;
	forDelivery: boolean;
	customizationId?: string;
	productId: string;
	cartId: string;
}

export interface PurchasedCartItem {
	quantity: number;
	forDelivery: boolean;
	price: number;
	cost: number;
	customizationId?: string;
	productId: string;
	cartId: string;
}

export const ACTIVE_CART_BASE_PATH = '/carts/active';

export const PURCHASED_CART_BASE_PATH = '/carts/purchased';
