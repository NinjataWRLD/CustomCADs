import { Category, DESIGNER_BASE_PATH } from '@/api/catalog/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	price: number;
	creatorName: string;
	category: Category;
}

export const url = (req: Request) => `${DESIGNER_BASE_PATH}/${req.id}`;
