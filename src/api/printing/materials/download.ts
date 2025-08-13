import { MATERIALS_BASE_PATH } from '@/api/printing/common';
import { DownloadResponse } from '@/api/common/files';

export type Request = {
	id: number;
};

export type Response = DownloadResponse;

export const url = () => `${MATERIALS_BASE_PATH}/presignedUrls/download`;
