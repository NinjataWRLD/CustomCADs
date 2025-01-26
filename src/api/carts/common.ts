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

export const ACTIVE_CART_BASE_PATH = '/carts/active';

export const PURCHASED_CART_BASE_PATH = '/carts/purchased';
