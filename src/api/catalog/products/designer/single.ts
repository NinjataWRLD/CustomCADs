import { CategoryDto, DESIGNER_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	id: string;
};

export type Response = {
	id: string;
	name: string;
	description: string;
	price: number;
	creatorName: string;
	category: CategoryDto;
};

export const url = (req: Request) => `${DESIGNER_BASE_PATH}/${req.id}`;
