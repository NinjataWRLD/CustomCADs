import { objectToSearchParams } from '@/utils/api';
import { CADS_BASE_PATH } from '../common';

export type Request = {
	page?: number;
	limit?: number;
};

export const url = (req: Request) =>
	`${CADS_BASE_PATH}?${objectToSearchParams(req)}`;
