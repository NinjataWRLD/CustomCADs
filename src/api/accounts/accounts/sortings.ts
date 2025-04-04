import { ACCOUNTS_BASE_PATH } from '../common';

export type Response = string[];

export const url = () => `${ACCOUNTS_BASE_PATH}/sortings`;
