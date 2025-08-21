import { useEffect, useRef } from 'react';

type BorderProps = {
	isAvailable?: boolean;
};

const Border = ({ isAvailable = true }: BorderProps) => {
	const borderRefs = useRef<(HTMLElement | null)[]>([]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			borderRefs.current.forEach((el) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const isInside =
					e.clientX >= rect.left &&
					e.clientX <= rect.right &&
					e.clientY >= rect.top &&
					e.clientY <= rect.bottom;

				if (isInside && isAvailable) {
					el.style.borderColor = 'white';
					el.style.filter = 'drop-shadow(0 0 20px white)';
				} else {
					const color =
						getComputedStyle(el).getPropertyValue('--color');
					el.style.borderColor = color;
					el.style.filter = `drop-shadow(0 0 20px ${color})`;
				}
			});
		};

		document.addEventListener('mousemove', handleMouseMove);
		return () => document.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<>
			<i
				ref={(el) => {
					borderRefs.current[0] = el;
				}}
				className='absolute transition-[0.2s] z-[-1] border-2 border-solid border-[rgba(255,255,255,0.315)] inset-0 rounded-[22%_62%_36%_27%_/_33%_21%_60%_59%]'
				style={{ '--color': '#8c09ff5f' } as React.CSSProperties}
			></i>
			<i
				ref={(el) => {
					borderRefs.current[1] = el;
				}}
				className='absolute transition-[0.2s] z-[-1] border-2 border-solid border-[rgba(255,255,255,0.315)] inset-0 rounded-[35%_37%_78%_59%_/_27%_28%_34%_33%]'
				style={{ '--color': '#550cf377' } as React.CSSProperties}
			></i>
			<i
				ref={(el) => {
					borderRefs.current[2] = el;
				}}
				className='absolute transition-[0.2s] z-[-1] border-2 border-solid border-[rgba(255,255,255,0.315)] inset-0 rounded-[36%_20%_50%_51%_/_14%_22%_40%_33%]'
				style={{ '--color': '#e43bc85e' } as React.CSSProperties}
			></i>
		</>
	);
};

export default Border;
