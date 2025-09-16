import { NOTIFICATIONS_BASE_PATH } from '@/api/notifications/common';

export type Request = {
	id: string;
};

export const url = () => `${NOTIFICATIONS_BASE_PATH}/read`;
