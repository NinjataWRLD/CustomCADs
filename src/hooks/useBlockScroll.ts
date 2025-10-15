import { useEffect } from 'react';

export const useBlockScroll = (condition?: boolean) => {
	useEffect(() => {
		if (!condition) return;

		const { scrollY } = window;
		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollY}px`;
		document.body.style.width = '100%';

		return () => {
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
			window.scrollTo(0, scrollY);
		};
	}, [condition]);
};
