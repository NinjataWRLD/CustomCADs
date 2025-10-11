import { CategoryDto, Counts, GALLERY_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	id: string;
};

export type Response = {
	id: string;
	name: string;
	description: string;
	price: number;
	tags: string[];
	uploadedAt: string;
	creatorName: string;
	counts: Counts;
	category: CategoryDto;
	imageId: string;
	cadId: string;
};

export const url = (req: Request) => `${GALLERY_BASE_PATH}/${req.id}`;
