import { useEffect, useState } from 'react';
import {
	useOpenNotification,
	useReadNotification,
} from '@/hooks/mutations/notifications';

type Props = { id: string; status: string };
export const useNotificationManager = (notification: Props) => {
	const [isRead, setIsRead] = useState(notification.status === 'Read');
	const { mutateAsync: read } = useReadNotification();
	useEffect(() => {
		if (notification.status === 'Unread' && isRead) {
			(async () => await read({ id: notification.id }))();
		}
	}, []);

	const [isOpened, setIsOpened] = useState(notification.status === 'Opened');
	const { mutateAsync: open } = useOpenNotification();
	useEffect(() => {
		if (notification.status === 'Read' && isOpened) {
			(async () => await open({ id: notification.id }))();
		}
	}, [isOpened]);

	return {
		read: () => {
			if (!isRead) setIsRead(true);
		},
		open: () => {
			if (!isOpened) setIsOpened(true);
		},
	};
};
