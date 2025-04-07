import { PURCHASED_CART_BASE_PATH } from '../common';
import { DownloadResponse } from '@/api/common/files';

export interface Request {
	id: string;
	itemId: string;
}

export type Response = DownloadResponse;

export const url = () => `${PURCHASED_CART_BASE_PATH}`;
