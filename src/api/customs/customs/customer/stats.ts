import { CUSTOMS_CUSTOMER_BASE_PATH } from '@/api/customs/common';

export interface Response {
	pendingCount: number;
	acceptedCount: number;
	begunCount: number;
	finishedCount: number;
	completedCount: number;
	reportedCount: number;
}

export const url = () => `${CUSTOMS_CUSTOMER_BASE_PATH}/stats`;
