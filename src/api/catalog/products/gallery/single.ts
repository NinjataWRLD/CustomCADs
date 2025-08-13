import {
	CategoryDto,
	Coordinates,
	Counts,
	GALLERY_BASE_PATH,
} from '@/api/catalog/common';

export type Request = {
	id: string;
};

export type Response = {
	id: string;
	name: string;
	description: string;
	price: number;
	volume: number;
	tags: string[];
	uploadedAt: string;
	creatorName: string;
	counts: Counts;
	category: CategoryDto;
	camCoordinates: Coordinates;
	panCoordinates: Coordinates;
};

export const url = (req: Request) => `${GALLERY_BASE_PATH}/${req.id}`;
