import { CUSTOMS_DESIGNER_BASE_PATH } from '@/api/customs/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderedAt: string;
	status: string;
	delivery: boolean;
	buyerName: string;
}

export const url = (req: Request) => `${CUSTOMS_DESIGNER_BASE_PATH}/${req.id}`;
