import { SHIPMENTS_BASE_PATH } from '../common';

export type Response = string[];

export const url = () => `${SHIPMENTS_BASE_PATH}/sortings`;
