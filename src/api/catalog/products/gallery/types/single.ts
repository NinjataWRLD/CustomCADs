import { Category, Counts } from '@/api/catalog/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	price: number;
	uploadDate: string;
	counts: Counts;
	category: Category;
}
