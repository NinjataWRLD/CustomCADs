import { MATERIALS_BASE_PATH } from '@/api/customizations/common';

export interface Request {
	id: number;
}

export const url = (req: Request) => `${MATERIALS_BASE_PATH}/${req.id}`;
