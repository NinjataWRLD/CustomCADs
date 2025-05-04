import {
	AcceptedCustomDto,
	CompletedCustomDto,
	FinishedCustomDto,
	CUSTOMS_DESIGNER_BASE_PATH,
} from '@/api/customs/common';

export interface Request {
	id: string;
}

export interface Response {
	id: string;
	name: string;
	description: string;
	orderedAt: string;
	status: string;
	forDelivery: boolean;
	buyerName: string;
	accepted?: AcceptedCustomDto;
	finished?: FinishedCustomDto;
	completed?: CompletedCustomDto;
}

export const url = (req: Request) => `${CUSTOMS_DESIGNER_BASE_PATH}/${req.id}`;
