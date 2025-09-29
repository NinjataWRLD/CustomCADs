import { objectToSearchParams } from '@/utils/api';
import { IDENTITY_BASE_PATH } from '../common';

type Provider = 'Google';
export type Request = {
	provider: Provider;
	redirectUrl: string;
	role?: string;
};

export const url = (req: Request) =>
	`${IDENTITY_BASE_PATH}/sso?${objectToSearchParams(req)}`;
