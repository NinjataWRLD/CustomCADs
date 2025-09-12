import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useGetNotificationStats } from '@/hooks/queries/notifications';

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
	children: notifications,
	show,
	empty,
	toggle,
}: BaseButtonProps) => {
	const { data: stats } = useGetNotificationStats();

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
						<ul className='relative w-full flex flex-col justify-center items-center text-white px-2'>
							{notifications}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

export default NotificationBell;
