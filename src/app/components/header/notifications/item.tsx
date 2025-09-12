import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Response as Notification } from '@/api/notifications/notifications/all';
import { useNotificationManager } from '@/hooks/notifications/useNotificationManager';
import * as dateTime from '@/utils/date-time';

const Tooltip = ({ text }: { text: string }) => (
	<span className='absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-1 text-sm text-white whitespace-nowrap bg-gradient-to-r from-transparent via-purple-900 to-purple-800 rounded opacity-0 group-hover/bell:opacity-100 transition-opacity duration-300 pointer-events-none'>
		{text}
	</span>
);

type NotificationProps = { notification: Notification };
const NotificationItem = ({ notification }: NotificationProps) => {
	const manager = useNotificationManager(notification);
	useEffect(() => {
		manager.read();
	}, []);

	const className = `flex items-center gap-3 w-[85%] px-4 py-4 border-b border-purple-500 last:border-none text-white hover:bg-purple-700/20 rounded transition-all duration-200`;
	const content = (
		<>
			{notification.status === 'Unread' && (
				<span className='w-2 h-2 rounded-full bg-fuchsia-600 mr-2 flex-shrink-0' />
			)}
			{notification.description}
		</>
	);

	return (
		<div className='relative w-full group/bell' onClick={manager.open}>
			{notification.link ? (
				<Link to={notification.link} className={className}>
					{content}
				</Link>
			) : (
				<div className={className}>{content}</div>
			)}
			<Tooltip text={dateTime.format({ date: notification.createdAt })} />
		</div>
	);
};

export default NotificationItem;
