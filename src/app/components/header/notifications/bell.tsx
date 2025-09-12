import { Children, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useGetNotificationStats } from '@/hooks/queries/notifications';
import { useNotificationVirtualization } from '@/hooks/notifications/useNotificationVirtualization';

type BaseButtonProps = {
	children: ReactNode;
	label: string;
	empty?: boolean;
	show: boolean;
	toggle: VoidFunction;
	onEndReached: VoidFunction;
};

const NotificationBell = ({
	label,
	children,
	show,
	empty,
	toggle,
	onEndReached,
}: BaseButtonProps) => {
	const { data: stats } = useGetNotificationStats();

	const notifications = Children.toArray(children);
	const { virtualizer, parentRef } = useNotificationVirtualization(
		notifications.length,
		onEndReached,
	);

	const list = (
		<ul
			style={{
				height: `${virtualizer.getTotalSize()}px`,
				position: 'relative',
			}}
		>
			{virtualizer.getVirtualItems().map((virtualRow) => (
				<li
					key={virtualRow.key}
					ref={virtualizer.measureElement}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						transform: `translateY(${virtualRow.start}px)`,
					}}
				>
					{notifications?.[virtualRow.index]}
				</li>
			))}
		</ul>
	);

	return (
		<div
			className='cursor-pointer relative inline-block transition-all duration-100 ease-linear group'
			onClick={toggle}
			data-tooltip={label}
		>
			<FontAwesomeIcon
				icon={faBell}
				size='2x'
				className='text-white transition-colors duration-200 ease-linear group-hover:text-gray-400'
			></FontAwesomeIcon>
			{stats && stats.unread !== 0 && (
				<div className='absolute bottom-1 right-0 w-5 h-5 bg-purple-700 text-white rounded-full flex justify-center items-center text-xs font-bold border-2 border-white transform translate-x-1/2 translate-y-1/2'>
					{stats?.unread}
				</div>
			)}

			<span className='absolute top-[130%] left-1/2 -translate-x-1/2 text-white font-normal whitespace-nowrap text-sm z-10 opacity-0 invisible transform translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'>
				{label}
			</span>

			{show && (
				<div className='absolute mt-3 left-[-170px] bg-zinc-800 border border-purple-700 shadow-md rounded-xl z-50 min-w-[20rem]'>
					<div className='absolute -top-2 right-[40%] w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-zinc-800' />

					{empty ? (
						<div className='relative flex flex-col justify-center items-center text-white py-40 gap-3 w-[85%] border-b border-purple-500 last:border-none rounded transition-all duration-20' />
					) : (
						<div
							ref={parentRef}
							className='relative w-full px-2 max-h-[400px] overflow-y-auto scrollbar-hide'
						>
							{list}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default NotificationBell;
