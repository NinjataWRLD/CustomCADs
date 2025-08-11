import { MATERIALS_BASE_PATH } from '@/api/printing/common';
import { UploadRequest } from '@/api/common/files';

export interface Request {
	id: number;
	file: UploadRequest;
}

export interface Response {
	presignedUrl: string;
}

export const url = () => `${MATERIALS_BASE_PATH}/presignedUrls/replace`;
