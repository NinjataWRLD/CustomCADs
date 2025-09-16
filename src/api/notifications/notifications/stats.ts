import { NOTIFICATIONS_BASE_PATH } from '@/api/notifications/common';

export type Response = {
	unread: number;
	read: number;
	opened: number;
	hidden: number;
};

export const url = () => `${NOTIFICATIONS_BASE_PATH}/stats`;
