import { CUSTOMS_CLIENT_BASE_PATH } from '@/api/customs/common';

export interface Request {
	id: string;
	paymentMethodId: string;
}

export const url = () => `${CUSTOMS_CLIENT_BASE_PATH}/purchase`;
