import { Category, CREATOR_BASE_PATH } from '@/api/catalog/common';

export interface Request {
	name: string;
	description: string;
	categoryId: number;
	price: number;
	imageKey: string;
	imageContentType: string;
	cadKey: string;
	cadContentType: string;
	cadVolume: number;
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

export const url = () => `${CREATOR_BASE_PATH}`;
