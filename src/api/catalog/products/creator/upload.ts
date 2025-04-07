import { CREATOR_BASE_PATH } from '@/api/catalog/common';
import { UploadRequest, UploadResponse } from '@/api/common/files';

export interface Request {
	productName: string;
	image: UploadRequest;
	cad: UploadRequest;
}

export interface Response {
	image: UploadResponse;
	cad: UploadResponse;
}

export const url = () => `${CREATOR_BASE_PATH}/presignedUrls/upload`;
