import { MATERIALS_BASE_PATH } from '@/api/customizations/common';

export interface Request {
	productName: string;
	imageContentType: string;
	imageFileName: string;
	cadContentType: string;
	cadFileName: string;
}

export interface Response {
	generatedImageKey: string;
	presignedImageUrl: string;
	generatedCadKey: string;
	presignedCadUrl: string;
}

export const url = () => `${MATERIALS_BASE_PATH}/presignedUrls/upload`;
