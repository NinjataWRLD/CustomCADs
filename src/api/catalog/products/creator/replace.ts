import { CREATOR_BASE_PATH } from '@/api/catalog/common';
import { UploadRequest } from '@/api/common/files';

export interface Request {
	id: string;
	file: UploadRequest;
}

export interface Response {
	presignedUrl: string;
}

export const url = (file: 'image' | 'cad') =>
	`${CREATOR_BASE_PATH}/presignedUrls/replace/${file}`;
