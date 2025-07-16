type RowProps = {
	title: string;
} & (
	| {
			type: 'text';
			text: string;
			onClick: VoidFunction;
	  }
	| { type: 'button'; button: React.ReactNode }
);
const Row = (props: RowProps) => {
	if (props.type === 'button') {
		return (
			<div className='relative flex items-center gap-8'>
				<h2>{props.title}</h2>
				{props.button}
			</div>
		);
	}

	return (
		<div className='relative flex flex-col justify-center gap-0 ml-0 mt-[5%]'>
			<h2>{props.title}</h2>
			<button
				onClick={props.onClick}
				className="relative z-[1] inline-block w-[200px] h-[50px] p-[10px] text-[14px] tracking-[1px] uppercase text-white text-center font-bold bg-black border-[3px] border-solid border-[#6347b55a] rounded-[30px] shadow-[0_2px_10px_rgba(0,0,0,0.16),_0_3px_6px_rgba(0,0,0,0.1)] cursor-pointer no-underline transition-all duration-300 ease-in-out hover:text-black focus:text-black active:scale-90 before:content-[''] before:absolute before:inset-y-0 before:left-1/2 before:right-1/2 before:bg-white before:rounded-[30px] before:z-[-1] before:opacity-0 before:transition-all before:duration-500 before:ease-in-out hover:before:left-0 hover:before:right-0 hover:before:opacity-100 focus:before:left-0 focus:before:right-0 focus:before:opacity-100"
			>
				{props.text}
			</button>
		</div>
	);
};

export default Row;
