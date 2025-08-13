import { Calculation } from '@/api/common/calculation';
import { CUSTOMS_CUSTOMER_BASE_PATH } from '@/api/customs/common';
import { objectToSearchParams } from '@/utils/api';

export type Request = {
	id: string;
	count: number;
	country: string;
	city: string;
	street: string;
	customizationId: string;
};

export type Response = Calculation[];

export const url = (req: Request) =>
	`${CUSTOMS_CUSTOMER_BASE_PATH}/calculate/${req.id}?${objectToSearchParams({ ...req, id: undefined })}`;
