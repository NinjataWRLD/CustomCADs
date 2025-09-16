import { MATERIALS_BASE_PATH } from '@/api/printing/common';
import { UploadRequest } from '@/api/common/files';

export type Request = {
	id: number;
	file: UploadRequest;
};

export type Response = string;

export const url = () => `${MATERIALS_BASE_PATH}/presignedUrls/replace`;
