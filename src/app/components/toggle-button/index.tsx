import { useState } from 'react';

type ToggleButtonProps = {
	initial: boolean;
	onClick: VoidFunction;
};
const ToggleButton = ({ initial, onClick }: ToggleButtonProps) => {
	const [checked, setChecked] = useState(initial);

	const handleClick = () => {
		setChecked((prev) => !prev);
		onClick();
	};

	return (
		<label className='relative inline-flex items-center cursor-pointer'>
			<input
				type='checkbox'
				className='sr-only peer'
				checked={checked}
				onChange={handleClick}
			/>
			<div className='group peer bg-slate-100 rounded-full duration-300 w-16 h-8 ring-2 ring-red-400 after:duration-300 after:bg-red-400 peer-checked:after:bg-purple-500 peer-checked:ring-purple-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95' />
		</label>
	);
};

export default ToggleButton;
