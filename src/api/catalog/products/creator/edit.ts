import { CREATOR_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	id: string;
	name: string;
	description: string;
	categoryId: number;
	price: number;
	imageKey: string;
	imageContentType: string;
	cadKey: string;
	cadContentType: string;
};

export const url = () => `${CREATOR_BASE_PATH}`;
