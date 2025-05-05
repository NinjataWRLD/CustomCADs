import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';

interface BaseButtonProps {
	label: string;
	settings: ReactNode;
	show: boolean;
	toggle: VoidFunction;
}

const AccountButton = ({ label, settings, show, toggle }: BaseButtonProps) => {
	return (
		<div
			className='relative inline-block transition-all duration-100 ease-linear group'
			data-tooltip={label}
		>
			<FontAwesomeIcon
				icon={faUserCog}
				size='2x'
				onClick={toggle}
				className='cursor-pointer text-white transition-colors duration-200 ease-linear group-hover:text-gray-400'
			/>

			<span className='absolute top-[130%] left-1/2 -translate-x-1/2 text-white font-normal whitespace-nowrap text-sm z-10 opacity-0 invisible transform translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'>
				{label}
			</span>

			{show && (
				<div className='absolute mt-3 right-0 bg-zinc-800 border border-purple-700 shadow-md rounded-xl z-50 min-w-[10rem]'>
					<div className='absolute -top-2 right-1/3 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-zinc-800'></div>

					<ul className='flex flex-col justify-center items-center text-white p-2'>
						{settings}
					</ul>
				</div>
			)}
		</div>
	);
};

export default AccountButton;
