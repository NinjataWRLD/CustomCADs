import { MATERIALS_BASE_PATH } from '@/api/customizations/common';
import { DownloadResponse } from '@/api/common/files';

export interface Request {
	id: number;
}

export type Response = DownloadResponse;

export const url = () => `${MATERIALS_BASE_PATH}/presignedUrls/download`;
