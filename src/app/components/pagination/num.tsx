type NumProps = {
	num: number;
	active: boolean;
	handleClick: (num: number) => void;
};

const Num = ({ num, active, handleClick }: NumProps) => {
	return (
		<button
			onClick={() => handleClick(num)}
			className={`relative w-[50px] aspect-square overflow-hidden text-center font-black text-[hsla(0,0%,100%,0.592)] text-base border-2 border-[hsla(288,81%,79%,0.278)] rounded-full transition-[0.5s] duration-[linear] cursor-pointer
  before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[5px] before:w-full before:box-border before:rounded-full before:border-b-[5px] before:border-b-transparent before:border-l-[5px] before:border-l-transparent before:border-solid before:translate-x-full
  after:content-[''] after:absolute after:left-0 after:top-0 after:h-[5px] after:w-full after:box-border after:rounded-full after:border-t-[5px] after:border-t-transparent after:border-r-[5px] after:border-r-transparent after:border-solid after:-translate-x-full
  hover:before:translate-x-0 hover:before:h-full hover:after:translate-x-0 hover:after:h-full hover:before:border-[hsl(265,85%,39%)] hover:after:border-[hsl(265,85%,39%)] hover:before:transition-[transform,height] hover:before:duration-[300ms] hover:before:ease-linear hover:after:transition-[transform,height] hover:after:duration-[300ms] hover:after:ease-linear
  ${active ? 'bg-[hsla(280,42%,58%,0.49)] text-white shadow-[0px_4px_8px_rgba(0,0,0,0.2)]' : ''}`}
		>
			{num}
		</button>
	);
};

export default Num;
