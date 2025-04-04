import { CUSTOMS_CLIENT_BASE_PATH } from '@/api/customs/common';

export type Response = string[];

export const url = () => `${CUSTOMS_CLIENT_BASE_PATH}/sortings`;
