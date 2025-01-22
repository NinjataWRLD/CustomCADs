import { ActiveCartItem } from '@/api/carts/common';

export interface Response {
	id: string;
	buyerName: string;
	items: ActiveCartItem[];
}
