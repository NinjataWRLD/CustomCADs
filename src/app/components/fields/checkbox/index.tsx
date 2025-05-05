import { ChangeEventHandler, CSSProperties } from 'react';

interface CheckboxProps {
	id: string;
	label: string;
	checked: boolean;
	onClick: ChangeEventHandler<HTMLInputElement>;
	style?: CSSProperties;
}

const Checkbox = ({ id, label, checked, onClick, style }: CheckboxProps) => {
	return (
		<div className='w-[85%] flex justify-center' style={style}>
			<input
				id={id}
				type='checkbox'
				checked={checked}
				onChange={onClick}
				className='peer hidden'
			/>
			<label
				htmlFor={id}
				className={`
					relative w-[1.2em] aspect-square border border-white rounded cursor-pointer block
					transition duration-300 ease-in-out
					peer-checked:bg-[#121212] peer-checked:border-[hsl(300,42%,65%)]
					after:content-[''] after:absolute after:left-[35%] after:top-[10%]
					after:w-[5px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white
					after:opacity-0 after:transition-all after:duration-300 after:delay-[150ms]
					after:rotate-45 after:scale-0 peer-checked:after:opacity-100 peer-checked:after:scale-100
				`}
			>
				<span className='absolute text-[1.05rem] w-[200px] left-[calc(100%+10px)]'>
					{label}
				</span>
			</label>
		</div>
	);
};

export default Checkbox;
