const ToggleButton = () => {
	return (
		<label className='relative inline-flex items-center cursor-pointer'>
			<input type='checkbox' className='sr-only peer' value='' />
			<div className='group peer bg-slate-100 rounded-full duration-300 w-16 h-8 ring-2 ring-red-400 after:duration-300 after:bg-red-400 peer-checked:after:bg-purple-500 peer-checked:ring-purple-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95'></div>
		</label>
	);
};

export default ToggleButton;
