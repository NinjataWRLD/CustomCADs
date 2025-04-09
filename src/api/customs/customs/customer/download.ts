import { CUSTOMS_CUSTOMER_BASE_PATH } from '@/api/customs/common';
import { DownloadResponse } from '@/api/common/files';

export interface Request {
	id: string;
}

export type Response = DownloadResponse;

export const url = () => `${CUSTOMS_CUSTOMER_BASE_PATH}/presignedUrls/download`;
