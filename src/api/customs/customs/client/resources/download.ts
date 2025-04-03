import { CUSTOMS_CLIENT_BASE_PATH } from '@/api/customs/common';

export interface Request {
	id: string;
}

export interface Response {
	presignedUrl: string;
	contentType: string;
}

export const url = () => `${CUSTOMS_CLIENT_BASE_PATH}/presignedUrls/download`;
