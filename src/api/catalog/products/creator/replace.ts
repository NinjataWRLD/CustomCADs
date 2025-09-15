import { CREATOR_BASE_PATH } from '@/api/catalog/common';
import { UploadRequest } from '@/api/common/files';

export type Request = {
	id: string;
	file: UploadRequest;
};

export type Response = string;

export const url = (file: 'image' | 'cad') =>
	`${CREATOR_BASE_PATH}/presignedUrls/replace/${file}`;
