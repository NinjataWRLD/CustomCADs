import { GALLERY_BASE_PATH } from '@/api/catalog/common';

export type Response = string[];

export const url = () => `${GALLERY_BASE_PATH}/sortings`;
