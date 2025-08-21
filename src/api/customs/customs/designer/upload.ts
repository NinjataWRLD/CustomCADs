import { CUSTOMS_DESIGNER_BASE_PATH } from '@/api/customs/common';
import { UploadRequest, UploadResponse } from '@/api/common/files';

export type Request = {
	id: string;
	cad: UploadRequest;
};

export type Response = UploadResponse;

export const url = () =>
	`${CUSTOMS_DESIGNER_BASE_PATH}/presignedUrls/upload/cad`;
