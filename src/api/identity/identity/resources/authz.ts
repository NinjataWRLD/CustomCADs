import { IDENTITY_BASE_PATH } from '../../common';

export type Response = string;

export const url = () => `${IDENTITY_BASE_PATH}/authorization`;
