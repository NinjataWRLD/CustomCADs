import * as headers from '@/types/headers';
import { CategoryDto, CREATOR_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	name: string;
	description: string;
	categoryId: number;
	price: number;
	imageKey: string;
	imageContentType: string;
	cadKey: string;
	cadContentType: string;
	cadVolume: number;
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
};

export const url = () => `${CREATOR_BASE_PATH}`;
