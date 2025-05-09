import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
	direction: 'prev' | 'next';
	duplicate?: boolean;
	disabled?: boolean;
	handleClick: VoidFunction;
}

const Button = ({
	direction,
	duplicate,
	disabled,
	handleClick,
}: ButtonProps) => {
	let icon: IconDefinition;

	switch (direction) {
		case 'next':
			icon = faChevronLeft;
			break;
		case 'prev':
			icon = faChevronRight;
			break;
		default:
			icon = null!;
			break;
	}

	return (
		<button
			onClick={handleClick}
			disabled={disabled}
			className={`relative block w-[60px] aspect-square overflow-hidden bg-transparent m-0 border-0 cursor-pointer disabled:cursor-not-allowed group`}
		>
			<span className='absolute inset-[0.5em] rounded-full border-4 border-[hsla(330,49%,68%,0.553)] transition-opacity duration-400 group-hover:opacity-0 group-hover:scale-75 group-focus:opacity-0 group-focus:scale-75'></span>
			<span className='absolute inset-[0.5em] rounded-full border-4 border-[hsl(294,75%,76%)] opacity-0 scale-125 transition-opacity duration-400 group-hover:opacity-100 group-hover:scale-100 group-focus:opacity-100 group-focus:scale-100'></span>

			<div className='absolute top-0 left-0 flex transition-transform duration-500 group-hover:-translate-x-[58px] group-focus:-translate-x-[58px]'>
				<span
					className={`${
						duplicate ? 'flex w-[21px] h-5' : 'block w-5 h-5'
					} rotate-180 m-[19px] items-center justify-center`}
				>
					<FontAwesomeIcon
						icon={icon}
						className='text-white text-[1.1rem]'
					/>
					{duplicate && (
						<FontAwesomeIcon
							icon={icon}
							className='text-white text-[1.1rem] ml-1'
						/>
					)}
				</span>
				<span
					className={`${
						duplicate ? 'flex w-[21px] h-5' : 'block w-5 h-5'
					} rotate-180 m-[19px] items-center justify-center`}
				>
					<FontAwesomeIcon
						icon={icon}
						className='text-white text-[1.1rem]'
					/>
					{duplicate && (
						<FontAwesomeIcon
							icon={icon}
							className='text-white text-[1.1rem] ml-1'
						/>
					)}
				</span>
			</div>
		</button>
	);
};

export default Button;
