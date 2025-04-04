import { Calculation } from '@/api/common/calculation';
import { CUSTOMS_CLIENT_BASE_PATH } from '@/api/customs/common';
import { objectToSearchParams } from '@/utils/api';

export interface Request {
	id: string;
	count: number;
	country: string;
	city: string;
	customizationId: string;
}

export type Response = Calculation;

export const url = (req: Request) =>
	`${CUSTOMS_CLIENT_BASE_PATH}/calculate/${req.id}?${objectToSearchParams({ ...req, id: undefined })}`;
