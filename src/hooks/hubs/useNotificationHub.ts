import { Response as Notification } from '@/api/notifications/notifications/all';
import { useMyAccount } from '@/hooks/queries/identity';
import { useHub } from './useHub';

export const useNotificationsHub = (
	methodName: 'ReceiveNew',
	onSingleReceived: (payload: Notification) => void | Promise<void>,
) => {
	const { data: account } = useMyAccount();
	useHub({
		hub: {
			connectionName: 'Notifications',
			methodName: methodName,
			onReceived: onSingleReceived,
		},
		condition: account !== undefined,
		deps: [account?.id],
	});
};
