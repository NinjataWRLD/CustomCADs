import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Link, LinkProps } from '@tanstack/react-router';

type BaseButtonProps = {
	children?: ReactNode;
	link: LinkProps;
	label: string;
	icon: IconDefinition;
	replace?: boolean;
};

const BaseButton = ({ children, link, label, icon }: BaseButtonProps) => {
	return (
		<div
			className='relative inline-block transition-all duration-100 ease-linear group'
			data-tooltip={label}
		>
			<Link {...link}>
				<FontAwesomeIcon
					icon={icon}
					size='2x'
					className='cursor-pointer transition-colors duration-200 ease-linear text-white hover:text-gray-400'
				/>
				{children}
			</Link>
			<span className='absolute top-[130%] left-1/2 -translate-x-1/2 text-white font-normal whitespace-nowrap text-sm z-10 opacity-0 invisible transform translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'>
				{label}
			</span>
		</div>
	);
};

export default BaseButton;
