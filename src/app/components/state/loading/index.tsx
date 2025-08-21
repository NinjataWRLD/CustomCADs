const Loader = ({ progress }: { progress?: number }) => {
	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99] flex flex-col items-center'>
			<span className='mb-9 text-purple-500 text-lg font-semibold'>
				{progress !== undefined && `${(progress * 100).toFixed(2)}%`}
			</span>

			<div
				className='relative w-24 h-24 animate-[cube_2s_infinite_ease]'
				style={{
					transformStyle: 'preserve-3d',
					perspective: '800px',
					perspectiveOrigin: 'center center',
				}}
			>
				<div
					className='absolute w-full h-full border-2 border-purple-500 bg-[rgba(128,0,255,0.2)]'
					style={{ transform: 'translateZ(48px)' }}
				></div>

				<div
					className='absolute w-full h-full border-2 border-purple-500 bg-[rgba(128,0,255,0.2)]'
					style={{ transform: 'rotateY(180deg) translateZ(48px)' }}
				></div>

				<div
					className='absolute w-full h-full border-2 border-purple-500 bg-[rgba(128,0,255,0.2)]'
					style={{ transform: 'rotateY(90deg) translateZ(48px)' }}
				></div>

				<div
					className='absolute w-full h-full border-2 border-purple-500 bg-[rgba(128,0,255,0.2)]'
					style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}
				></div>

				<div
					className='absolute w-full h-full border-2 border-purple-500 bg-[rgba(128,0,255,0.2)]'
					style={{ transform: 'rotateX(90deg) translateZ(48px)' }}
				></div>

				<div
					className='absolute w-full h-full border-2 border-purple-500 bg-[rgba(128,0,255,0.2)]'
					style={{ transform: 'rotateX(-90deg) translateZ(48px)' }}
				></div>
			</div>
		</div>
	);
};

export default Loader;
