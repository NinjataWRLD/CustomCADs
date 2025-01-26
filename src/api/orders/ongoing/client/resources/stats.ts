import { ONGOING_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';

export interface Response {
	pendingCount: number;
	acceptedCount: number;
	begunCount: number;
	finishedCount: number;
	reportedCount: number;
	removedCount: number;
}

export const url = () => `${ONGOING_ORDERS_CLIENT_BASE_PATH}/stats`;
