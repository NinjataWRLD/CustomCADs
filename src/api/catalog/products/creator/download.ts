import { CREATOR_BASE_PATH } from '@/api/catalog/common';
import { DownloadResponse } from '@/api/common/files';

export interface Request {
	id: string;
}

export type Response = DownloadResponse;

export const url = (file: 'image' | 'cad') =>
	`${CREATOR_BASE_PATH}/presignedUrls/download/${file}`;
