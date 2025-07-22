import * as headers from '@/types/headers';
import { IDENTITY_BASE_PATH } from '../common';

export type Request = {
	username: string;
	password: string;
	rememberMe?: boolean;
} & headers.IdempotencyKey;

export const url = () => `${IDENTITY_BASE_PATH}/login`;
