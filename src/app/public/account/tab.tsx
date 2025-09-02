type TabProps = {
	text: string;
	isActive: boolean;
	onClick: VoidFunction;
};
const Tab = ({ text, isActive, onClick }: TabProps) => {
	return (
		<div
			className={`w-full h-[15%] cursor-pointer flex justify-center items-center transition-all duration-300 ease-linear bg-[rgba(142,110,205,0.31)] hover:bg-[rgba(98,42,161,0.522)] hover:w-[90%] hover:ml-[10%]`}
			onClick={onClick}
			style={{
				clipPath:
					'polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 24% 54%)',
			}}
		>
			<span
				className={`transition-[font-weight] duration-[0.3s] ease-linear ml-[30px] ${isActive ? 'font-bold' : ''}`}
			>
				{text}
			</span>
		</div>
	);
};

export default Tab;
