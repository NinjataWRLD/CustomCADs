import { useNavigate } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface SettingProps {
	icon: IconDefinition;
	label: string;
	link: string;
	hide: VoidFunction;
	onClick?: VoidFunction;
}

const Setting = ({ label, link, icon, hide, onClick }: SettingProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		hide();
		navigate({ to: link });
		if (onClick) onClick();
	};

	return (
		<div className='relative w-full group'>
			<li
				onClick={handleClick}
				className='flex items-center gap-3 w-[30%] px-4 py-3 cursor-pointer border-b border-purple-500 last:border-none 
								text-white hover:bg-purple-700/20 rounded transition-all duration-200'
			>
				<FontAwesomeIcon
					icon={icon}
					className='text-xl text-purple-300 transition-transform duration-200 group-hover:scale-110'
				/>
			</li>

			<span className='absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-1 text-sm text-white whitespace-nowrap bg-gradient-to-r from-transparent to-purple-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
				{label}
			</span>
		</div>
	);
};

export default Setting;
