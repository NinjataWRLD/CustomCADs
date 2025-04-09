import { Category, Counts, CREATOR_BASE_PATH } from '@/api/catalog/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	price: number;
	uploadedAt: string;
	counts: Counts;
	category: Category;
}

export const url = (req: Request) => `${CREATOR_BASE_PATH}/${req.id}`;
