import { objectToSearchParams } from '@/utils/api';
import { ACCOUNTS_BASE_PATH } from '../common';

export interface Request {
	name?: string;
	sortingType?: string;
	sortingDirection?: string;
	page: number;
	limit: number;
}

export const url = (req: Request) =>
	`${ACCOUNTS_BASE_PATH}?${objectToSearchParams(req)}`;
