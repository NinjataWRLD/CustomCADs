import { NOTIFICATIONS_BASE_PATH } from '@/api/notifications/common';

export type Response = string[];

export const url = () => `${NOTIFICATIONS_BASE_PATH}/sortings`;
