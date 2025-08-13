import { GALLERY_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	id: string;
	tagId: string;
};

export const url = () => `${GALLERY_BASE_PATH}/tags/remove`;
