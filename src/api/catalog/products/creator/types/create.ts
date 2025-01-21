import { Category } from '@/api/catalog/common';

export interface Request {
	name: string;
	description: string;
	categoryId: number;
	price: number;
	imageKey: string;
	imageContentType: string;
	cadKey: string;
	cadContentType: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	creatorName: string;
	uploadDate: string;
	price: number;
	status: string;
	category: Category;
}
