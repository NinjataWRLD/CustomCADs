import { MATERIALS_BASE_PATH } from '@/api/printing/common';

export type Request = {
	id: number;
};

export const url = (req: Request) => `${MATERIALS_BASE_PATH}/${req.id}`;
