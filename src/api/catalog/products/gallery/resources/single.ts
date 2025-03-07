import {
	Category,
	Coordinates,
	Counts,
	GALLERY_BASE_PATH,
} from '@/api/catalog/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	price: number;
	volume: number;
	uploadDate: string;
	creatorName: string;
	counts: Counts;
	category: Category;
	camCoordinates: Coordinates;
	panCoordinates: Coordinates;
}

export const url = (req: Request) => `${GALLERY_BASE_PATH}/${req.id}`;
