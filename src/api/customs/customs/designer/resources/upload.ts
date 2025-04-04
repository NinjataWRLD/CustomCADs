import { CUSTOMS_DESIGNER_BASE_PATH } from '@/api/customs/common';

export interface Request {
	id: string;
	contentType: string;
	fileName: string;
}

export interface Response {
	cadKey: string;
	cadUrl: string;
}

export const url = () =>
	`${CUSTOMS_DESIGNER_BASE_PATH}/presignedUrls/upload/cad`;
