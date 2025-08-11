import { MATERIALS_BASE_PATH } from '@/api/printing/common';
import { UploadRequest, UploadResponse } from '@/api/common/files';

export interface Request {
	materialName: string;
	image: UploadRequest;
}

export type Response = UploadResponse;

export const url = () => `${MATERIALS_BASE_PATH}/presignedUrls/upload`;
