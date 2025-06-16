import { IDENTITY_BASE_PATH } from '../common';

export type Response = Blob;

export const url = () => `${IDENTITY_BASE_PATH}/download-info`;
