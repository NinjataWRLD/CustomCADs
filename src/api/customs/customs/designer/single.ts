import {
	AcceptedCustomDto,
	CompletedCustomDto,
	FinishedCustomDto,
	CUSTOMS_DESIGNER_BASE_PATH,
	CustomCategory,
} from '@/api/customs/common';

export type Request = {
	id: string;
};

export type Response = {
	id: string;
	name: string;
	description: string;
	orderedAt: string;
	status: string;
	forDelivery: boolean;
	buyerName: string;
	category?: CustomCategory;
	accepted?: AcceptedCustomDto;
	finished?: FinishedCustomDto;
	completed?: CompletedCustomDto;
};

export const url = (req: Request) => `${CUSTOMS_DESIGNER_BASE_PATH}/${req.id}`;
