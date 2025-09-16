import { useState, useEffect, useRef } from 'react';

export const usePopup = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [wasOpened, setWasOpened] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const open = () => {
		if (!wasOpened) setWasOpened(true);
		setIsOpen(true);
	};
	const close = () => {
		if (!wasOpened) setWasOpened(true);
		setIsOpen(false);
	};
	const toggle = () => {
		if (!wasOpened) setWasOpened(true);
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				close();
			}
		};

		if (isOpen) {
			document.addEventListener('click', handleClickOutside, true);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [isOpen]);

	return { ref, isOpen, wasOpened, open, close, toggle };
};
