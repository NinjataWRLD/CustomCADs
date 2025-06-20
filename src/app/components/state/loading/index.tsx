const Loader = () => {
	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99] bg-[linear-gradient(rgb(186,66,255)_35%,rgb(0,225,255))] w-[100px] h-[100px] animate-[spinning_1.7s_linear_infinite] text-center blur-[1px] shadow-[0px_-5px_20px_0px_rgb(186,66,255),0px_5px_20px_0px_rgb(0,225,255)] rounded-[50px]'>
			<div className='bg-[rgb(36,36,36)] w-[100px] h-[100px] blur-[10px] rounded-[50px]'></div>
		</div>
	);
};

export default Loader;
