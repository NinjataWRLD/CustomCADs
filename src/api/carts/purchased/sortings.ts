import { PURCHASED_CART_BASE_PATH } from '../common';

export type Response = string[];

export const url = () => `${[PURCHASED_CART_BASE_PATH]}/sortings`;
