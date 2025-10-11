import * as headers from '@/types/headers';
import { CategoryDto, CREATOR_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	name: string;
	description: string;
	categoryId: number;
	price: number;
	imageId: string;
	cadId: string;
} & headers.IdempotencyKey;

export type Response = {
	id: string;
	name: string;
	description: string;
	creatorName: string;
	uploadedAt: string;
	price: number;
	status: string;
	category: CategoryDto;
	imageId: string;
	cadId: string;
};

export const url = () => `${CREATOR_BASE_PATH}`;
