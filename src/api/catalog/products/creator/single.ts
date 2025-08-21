import { CategoryDto, Counts, CREATOR_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	id: string;
};

export type Response = {
	id: string;
	name: string;
	description: string;
	price: number;
	uploadedAt: string;
	counts: Counts;
	category: CategoryDto;
};

export const url = (req: Request) => `${CREATOR_BASE_PATH}/${req.id}`;
