import { MATERIALS_BASE_PATH } from '@/api/customizations/common';

export interface Request {
	id: number;
}

export interface Response {
	presignedUrl: string;
	contentType: string;
}

export const url = () => `${MATERIALS_BASE_PATH}/presignedUrls/download`;
