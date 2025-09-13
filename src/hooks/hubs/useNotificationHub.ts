import { Response as Notification } from '@/api/notifications/notifications/all';
import { useMyAccount } from '@/hooks/queries/identity';
import * as hubs from '@/utils/hubs';
import { useEffect } from 'react';

export const useNotificationsHub = (
	onSingleReceived: (payload: Notification) => Promise<void>,
) => {
	const { data: account } = useMyAccount();

	useEffect(() => {
		if (account) {
			const connection = hubs.buildConnection('Notifications');

			const init = async () => {
				connection.on('ReceiveNew', onSingleReceived);
				await hubs.start(connection);
			};
			init();

			return () => {
				hubs.stop(connection);
			};
		}
	}, [account?.username]);
};
