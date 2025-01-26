import { Category, Counts, GALLERY_BASE_PATH } from '@/api/catalog/common';

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

export const url = (req: Request) => `${GALLERY_BASE_PATH}/${req.id}`;
