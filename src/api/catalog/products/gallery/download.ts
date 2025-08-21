import { GALLERY_BASE_PATH } from '@/api/catalog/common';
import { DownloadResponse } from '@/api/common/files';

export type Request = {
	id: string;
};

export type Response = DownloadResponse;

export const url = (file: 'cad' | 'image') =>
	`${GALLERY_BASE_PATH}/presignedUrls/download/${file}`;
