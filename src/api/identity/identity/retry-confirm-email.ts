import * as headers from '@/types/headers';
import { IDENTITY_BASE_PATH } from '../common';

export type Request = {
	username: string;
} & headers.IdempotencyKey;

export const url = () => `${IDENTITY_BASE_PATH}/email/confirm/retry`;
