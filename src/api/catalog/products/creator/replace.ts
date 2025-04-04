import { CREATOR_BASE_PATH } from '@/api/catalog/common';

export interface Request {
	id: string;
	contentType: string;
	fileName: string;
}

export interface Response {
	presignedUrl: string;
}

export const url = (file: 'image' | 'cad') =>
	`${CREATOR_BASE_PATH}/presignedUrls/replace/${file}`;
