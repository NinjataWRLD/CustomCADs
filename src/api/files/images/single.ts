import { IMAGES_BASE_PATH } from '../common';

export type Request = {
	id: string;
};

export const url = (req: Request) => `${IMAGES_BASE_PATH}/${req.id}`;
