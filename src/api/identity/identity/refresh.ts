import * as headers from '@/types/headers';
import { IDENTITY_BASE_PATH } from '../common';

export type Request = headers.IdempotencyKey;

export const url = () => `${IDENTITY_BASE_PATH}/refresh`;
