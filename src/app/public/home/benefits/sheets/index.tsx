import { useEffect, useRef } from 'react';

type SheetProps = {
	title: string;
	icon: string;
	details: string;
};

const Sheet = ({ title, icon, details }: SheetProps) => {
	const borderRef = useRef<HTMLDivElement>(null);
	const isHoveredRef = useRef(false);
	const angleRef = useRef(0);

	useEffect(() => {
		const el = borderRef.current;
		if (!el) return;

		let frameId: number;

		const rotate = () => {
			if (!isHoveredRef.current) {
				angleRef.current = (angleRef.current - 0.5) % 360;
				el.style.transform = `rotateZ(${angleRef.current}deg)`;
			}
			frameId = requestAnimationFrame(rotate);
		};

		frameId = requestAnimationFrame(rotate);

		return () => cancelAnimationFrame(frameId);
	}, []);

	return (
		<div
			className='relative w-[65%] isolate overflow-hidden cursor-pointer m-8 px-8 py-6 rounded-2xl text-white bg-[hsla(286,65%,38%,0.619)] group'
			onMouseEnter={() => {
				isHoveredRef.current = true;
			}}
			onMouseLeave={() => {
				isHoveredRef.current = false;
			}}
		>
			<div
				ref={borderRef}
				className="absolute content-[''] w-[200%] h-[200%] bg-[conic-gradient(_rgba(224,63,211,0.721)_0deg,transparent_60deg,transparent_180deg,rgba(224,63,211,0.721)_180deg,transparent_240deg_)] z-[-2] -inset-2/4"
			></div>

			<div className="absolute content-[''] bg-[hsl(228,21%,14%)] z-[-1] transition-all duration-[0.35s] ease-linear rounded-xl inset-1 group-hover:bg-[hsl(286,43%,28%)]"></div>

			<i
				className={`${icon} text-transparent text-9xl absolute right-[-5%] opacity-70 z-[9] transition-[text-stroke] duration-[0.4s] ease-linear top-[20%] [text-stroke:_thin_purple] group-hover:[text-stroke:_thin_white]`}
			></i>

			<div className='z-10'>
				<div className='font-bold text-center text-[1.2rem] transition-text duration-400 ease-linear group-hover:text-[1.1rem]'>
					{title}
				</div>
				<div className='flex flex-col gap-2.5 leading-[1.3] text-[1.1rem] text-[hsl(0,0%,73%)] max-w-[600px] tracking-[0.4px] text-left px-5 py-3'>
					{details}
				</div>
			</div>
		</div>
	);
};

export default Sheet;
