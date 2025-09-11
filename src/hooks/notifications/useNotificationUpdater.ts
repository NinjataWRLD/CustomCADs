import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
	isBellOpen: boolean;
	wasBellOpened: boolean;
	queryKeysToInvalidate: unknown[][];
};
export const useNotificationUpdater = (props: Props) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		if (props.wasBellOpened && !props.isBellOpen) {
			const updateNotifications = async () => {
				for (const key of props.queryKeysToInvalidate) {
					await queryClient.invalidateQueries({
						queryKey: key,
						exact: true,
					});
				}
			};
			updateNotifications();
		}
	}, [props.wasBellOpened, props.isBellOpen]);
};
