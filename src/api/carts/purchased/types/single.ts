import { PurchasedCartItem } from '@/api/carts/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	total: number;
	purchaseDate: string;
	buyerName: string;
	shipmentId?: string;
	items: PurchasedCartItem[];
}
