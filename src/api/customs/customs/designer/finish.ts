import { CUSTOMS_DESIGNER_BASE_PATH } from '@/api/customs/common';

export type Request = {
	id: string;
	price: number;
	cadKey: string;
	cadContentType: string;
	cadVolume: number;
};

export const url = () => `${CUSTOMS_DESIGNER_BASE_PATH}/finished`;
