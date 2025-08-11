interface ProgressBarProps {
	progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
	return (
		<div
			className="absolute top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99] box-border w-[200px] h-[200px] rounded-full border-[4px] border-[rgba(255,255,255,0.1)] [background-clip:padding-box] [-webkit-mask:linear-gradient(rgba(0,0,0,0.1),#000000_90%)] [transform-origin:50%_60%] [transform:perspective(200px)_rotateX(66deg)] animate-spinner-wiggle
            before:content-[''] before:absolute before:m-[-4px] before:box-border before:w-inherit before:h-inherit before:rounded-inherit before:opacity-[0.05] before:border-inherit before:border-transparent before:border-t-[#66e6ff] before:animate-spinner-spin before:animate-spinner-fade
            after:content-[''] after:absolute after:m-[-4px] after:box-border after:w-inherit after:h-inherit after:rounded-inherit after:opacity-[0.05] after:border-inherit after:border-transparent after:border-t-[#f0db75] after:animate-spinner-spin after:animate-spinner-fade after:[animation-delay:0.3s]"
		>
			<span className='absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-white text-4xl'>
				{`${(progress * 100).toFixed(2)}%`}
			</span>
		</div>
	);
};

export default ProgressBar;
