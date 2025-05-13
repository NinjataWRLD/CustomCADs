import { Coordinates } from '@/api/catalog/common';
import { PURCHASED_CART_BASE_PATH } from '../common';
import { DownloadResponse } from '@/api/common/files';

export interface Request {
	id: string;
	productId: string;
}

export type Response = {
	camCoordinates: Coordinates;
	panCoordinates: Coordinates;
} & DownloadResponse;

export const url = () =>
	`${PURCHASED_CART_BASE_PATH}/presignedUrls/download/response`;
