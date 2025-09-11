import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import { keys, useGetNotifications } from '@/hooks/queries/notifications';
import { useNotificationUpdater } from '@/hooks/notifications/useNotificationUpdater';
import { usePopup } from '@/hooks/usePopup';
import NotificationBell from './bell';
import NotificationItem from './item';

const PARAMS = { page: 1, limit: 50 };
const NotificationsButton = () => {
	const { data: notifications } = useGetNotifications(PARAMS);
	const tHeader = useHeaderTranslation();

	const popup = usePopup();
	useNotificationUpdater({
		isBellOpen: popup.isOpen,
		wasBellOpened: popup.wasOpened,
		queryKeysToInvalidate: [
			keys.all(PARAMS) as unknown as unknown[],
			keys.stats() as unknown as unknown[],
		],
	});

	return (
		<div ref={popup.ref}>
			<NotificationBell
				label={tHeader('notifications')}
				empty={!notifications?.count}
				show={popup.isOpen}
				toggle={popup.toggle}
			>
				{notifications?.items.map((n) => (
					<NotificationItem key={n.id} notification={n} />
				))}
			</NotificationBell>
		</div>
	);
};

export default NotificationsButton;
