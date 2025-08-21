import {
	AcceptedCustomDto,
	CompletedCustomDto,
	FinishedCustomDto,
	CUSTOMS_CUSTOMER_BASE_PATH,
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
	accepted?: AcceptedCustomDto;
	finished?: FinishedCustomDto;
	completed?: CompletedCustomDto;
};

export const url = (req: Request) => `${CUSTOMS_CUSTOMER_BASE_PATH}/${req.id}`;
