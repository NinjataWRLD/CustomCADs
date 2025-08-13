import { CUSTOMIZATIONS_BASE_PATH } from '@/api/printing/common';

export type Request = {
	id: string;
};

export const url = (req: Request) => `${CUSTOMIZATIONS_BASE_PATH}/${req.id}`;
