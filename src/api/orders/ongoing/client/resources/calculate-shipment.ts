import { Calculation } from '@/api/common/calculation';
import { ONGOING_ORDERS_CLIENT_BASE_PATH } from '@/api/orders/common';
import objectToUrl from '@/utils/object-to-url';

export interface Request {
	id: string;
	count: number;
	weight: number;
	country: string;
	city: string;
}

export type Response = Calculation;

export const url = (req: Request) =>
	`${ONGOING_ORDERS_CLIENT_BASE_PATH}/calculate/${req.id}?${objectToUrl({ ...req, id: undefined })}`;
