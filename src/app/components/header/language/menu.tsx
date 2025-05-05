import { useTranslation } from 'react-i18next';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import gbFlag from '@/assets/images/flags/gb.svg';
import bgFlag from '@/assets/images/flags/bg.svg';
import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

type LanguageMenuProps = {
	closeMenu: () => void;
	isVisible: boolean;
	onExited: () => void;
};

const LanguageMenu = ({
	closeMenu,
	onExited,
	isVisible = true,
}: LanguageMenuProps) => {
	const { i18n } = useTranslation();
	const tHeader = useHeaderTranslation();
	const [animationState, setAnimationState] = useState<
		'entering' | 'visible' | 'exiting'
	>(isVisible ? 'entering' : 'exiting');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleClose = () => {
		setAnimationState('exiting');
		closeMenu();
	};

	const handleLanguageChange = (lang: string) => {
		if (i18n.language !== lang) {
			i18n.changeLanguage(lang);
		}
		handleClose();
	};

	useEffect(() => {
		if (isVisible && animationState === 'entering') {
			timeoutRef.current = setTimeout(() => {
				setAnimationState('visible');
			}, 50);
		}
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [isVisible, animationState]);

	useEffect(() => {
		if (animationState === 'exiting') {
			timeoutRef.current = setTimeout(() => {
				onExited();
			}, 300);
		}
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [animationState]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node;
			const menuElement = document.getElementById('language-menu');
			const iconWrapper = document.getElementById(
				'language-icon-wrapper',
			);

			if (
				menuElement &&
				!menuElement.contains(target) &&
				iconWrapper &&
				!iconWrapper.contains(target)
			) {
				handleClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const animationClasses = {
		entering: 'translate-x-full opacity-0',
		visible: 'translate-x-0 opacity-100',
		exiting: 'translate-x-full opacity-0',
	};

	return (
		<aside
			id='language-menu'
			className={clsx(
				'fixed top-[10%] right-0 z-[1000] h-[80dvh] w-[300px] max-w-full rounded-tl-[30px] rounded-bl-[30px] bg-white p-6 shadow-[–2px_0_10px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out flex flex-col',
				'pointer-events-auto',
				animationClasses[animationState],
			)}
		>
			<div
				className='absolute top-5 right-5 text-gray-600 cursor-pointer hover:text-gray-800 text-xl'
				onClick={handleClose}
				aria-label='Close menu'
			>
				<FontAwesomeIcon icon={faTimes} />
			</div>
			<h3 className='text-xl font-semibold text-gray-800 mt-5 mb-8'>
				{tHeader('choose-language')}
			</h3>
			<section className='flex flex-col gap-4'>
				<div
					onClick={() => handleLanguageChange('en')}
					className={clsx(
						'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors relative',
						i18n.language === 'en'
							? 'bg-blue-50 border border-blue-100'
							: 'hover:bg-gray-100',
					)}
				>
					<img
						src={gbFlag}
						width={50}
						height={50}
						alt='English flag'
						className='rounded-full object-cover shadow'
					/>
					<span className='ml-4 text-[1.1rem] text-gray-700 font-medium flex-grow'>
						{tHeader('english')}
					</span>
					{i18n.language === 'en' && (
						<FontAwesomeIcon
							icon={faCheck}
							className='text-blue-500 ml-auto text-sm'
						/>
					)}
				</div>
				<hr className='border-none h-px bg-gray-200 my-2' />
				<div
					onClick={() => handleLanguageChange('bg')}
					className={clsx(
						'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors relative',
						i18n.language === 'bg'
							? 'bg-blue-50 border border-blue-100'
							: 'hover:bg-gray-100',
					)}
				>
					<img
						src={bgFlag}
						width={50}
						height={50}
						alt='Bulgarian flag'
						className='rounded-full object-cover shadow'
					/>
					<span className='ml-4 text-[1.1rem] text-gray-700 font-medium flex-grow'>
						{tHeader('bulgarian')}
					</span>
					{i18n.language === 'bg' && (
						<FontAwesomeIcon
							icon={faCheck}
							className='text-blue-500 ml-auto text-sm'
						/>
					)}
				</div>
			</section>
		</aside>
	);
};

export default LanguageMenu;
