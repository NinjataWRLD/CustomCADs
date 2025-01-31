import { GALLERY_BASE_PATH } from '@/api/catalog/common';

export interface Request {
	id: string;
}

export interface Response {
	presignedUrl: string;
	contentType: string;
}

export const url = (file: 'cad' | 'image') =>
	`${GALLERY_BASE_PATH}/presignedUrls/download/${file}`;
