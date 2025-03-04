import { MATERIALS_BASE_PATH } from '@/api/customizations/common';

export interface Request {
	id: number;
	contentType: string;
	fileName: string;
}

export interface Response {
	presignedUrl: string;
}

export const url = () => `${MATERIALS_BASE_PATH}/presignedUrls/replace`;
