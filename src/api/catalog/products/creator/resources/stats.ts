import { CREATOR_BASE_PATH } from '@/api/catalog/common';

export interface Response {
	uncheckedCount: number;
	validatedCount: number;
	reportedCount: number;
	bannedCount: number;
}

export const url = () => `${CREATOR_BASE_PATH}/stats`;
