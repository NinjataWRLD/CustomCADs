import { Category } from '@/api/catalog/common';

export interface Request {
	limit: number;
}

export interface Response {
	id: string;
	name: string;
	uploadDate: string;
	status: string;
	category: Category;
}
