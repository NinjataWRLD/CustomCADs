import { ActiveCartItem } from '@/api/carts/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	buyerName: string;
	items: ActiveCartItem[];
}
