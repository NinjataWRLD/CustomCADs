import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

const Border = () => {
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

				if (isInside) {
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
				className={styles.border}
				style={{ '--color': '#8c09ff5f' } as React.CSSProperties}
			></i>
			<i
				ref={(el) => {
					borderRefs.current[1] = el;
				}}
				className={styles.border}
				style={{ '--color': '#550cf377' } as React.CSSProperties}
			></i>
			<i
				ref={(el) => {
					borderRefs.current[2] = el;
				}}
				className={styles.border}
				style={{ '--color': '#e43bc85e' } as React.CSSProperties}
			></i>
		</>
	);
};

export default Border;
