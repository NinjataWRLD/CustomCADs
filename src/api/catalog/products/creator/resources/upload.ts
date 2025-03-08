import { CREATOR_BASE_PATH } from '@/api/catalog/common';

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

export const url = () => `${CREATOR_BASE_PATH}/presignedUrls/upload`;
