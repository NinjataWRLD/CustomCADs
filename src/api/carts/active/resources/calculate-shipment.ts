import objectToSearchParams from '@/utils/object-to-search-params';
import { Calculation } from '@/api/common/calculation';
import { ACTIVE_CART_BASE_PATH } from '../../common';

export interface Request {
	country: string;
	city: string;
}

export type Response = Calculation;

export const url = (req: Request) =>
	`${ACTIVE_CART_BASE_PATH}/calculate?${objectToSearchParams(req)}`;
