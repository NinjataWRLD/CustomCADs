import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import * as all from '@/api/notifications/notifications/all';
import { keys } from '@/hooks/queries/notifications';

type UseNotificationUpdaterProps = {
	isBellOpen: boolean;
	wasBellOpened: boolean;
	params: all.Request;
};
export const useNotificationUpdater = ({
	params,
	isBellOpen,
	wasBellOpened,
}: UseNotificationUpdaterProps) => {
	const queryClient = useQueryClient();

	const updateNotificationsQueries = async () => {
		for (const key of [keys.all(params), keys.stats()]) {
			await queryClient.invalidateQueries({
				queryKey: key,
				exact: true,
			});
		}
	};

	useEffect(() => {
		if (wasBellOpened && !isBellOpen) {
			updateNotificationsQueries();
		}
	}, [wasBellOpened, isBellOpen, queryClient.setQueryData]);
};
