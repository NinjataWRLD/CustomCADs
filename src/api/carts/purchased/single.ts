import {
	PURCHASED_CART_BASE_PATH,
	PurchasedCartItem,
} from '@/api/carts/common';

export type Request = {
	id: string;
};

export type Response = {
	id: string;
	total: number;
	purchasedAt: string;
	paymentStatus: string;
	buyerName: string;
	shipmentId?: string;
	items: PurchasedCartItem[];
};

export const url = (req: Request) => `${PURCHASED_CART_BASE_PATH}/${req.id}`;
