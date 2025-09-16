import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Result } from '@/api/common/result';
import * as stats from '@/api/notifications/notifications/stats';
import * as all from '@/api/notifications/notifications/all';
import { keys } from '@/hooks/queries/notifications';
import { useNotificationsHub } from '@/hooks/hubs/useNotificationHub';

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

	const setAllQueryData = async (notification: all.Response) => {
		type AllResponse = {
			pages: Result<all.Response>[];
			pageParams: number[];
		};
		await queryClient.setQueryData(
			keys.all(params),
			(prev: AllResponse): AllResponse => {
				if (!prev) {
					return {
						pages: [{ items: [notification], count: 1 }],
						pageParams: [1],
					};
				}

				const [firstPage, ...restOfPages] = prev.pages;
				const updatedFirstPage: typeof firstPage = {
					...firstPage,
					items: [...firstPage.items],
				};

				if (!firstPage.items.some((x) => x.id === notification.id)) {
					updatedFirstPage.items.unshift(notification);
					updatedFirstPage.count++;
				}

				return {
					...prev,
					pages: [updatedFirstPage, ...restOfPages],
				};
			},
		);
	};

	const setStatsQueryData = async () => {
		await queryClient.setQueryData(
			keys.stats(),
			(prev: stats.Response): stats.Response => {
				if (!prev) {
					return {
						unread: 1,
						read: 0,
						opened: 0,
						hidden: 0,
					};
				}

				return {
					...prev,
					unread: prev.unread + 1,
				};
			},
		);
	};

	const updateNotificationsQueries = async () => {
		for (const key of [keys.all(params), keys.stats()]) {
			await queryClient.invalidateQueries({
				queryKey: key,
				exact: true,
			});
		}
	};

	useNotificationsHub('ReceiveNew', async (notification) => {
		await setAllQueryData(notification);
		await setStatsQueryData();
		await updateNotificationsQueries();
	});

	useEffect(() => {
		if (wasBellOpened && !isBellOpen) {
			updateNotificationsQueries();
		}
	}, [wasBellOpened, isBellOpen, queryClient.setQueryData]);
};
