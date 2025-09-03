import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { ALLOWED_LANGUAGES, Language } from '@/types/locale';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import gbFlag from '@/assets/images/flags/gb.svg';
import bgFlag from '@/assets/images/flags/bg.svg';
import Flag from './flag';

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
	const tHeader = useHeaderTranslation();
	const [animationState, setAnimationState] = useState<
		'entering' | 'visible' | 'exiting'
	>(isVisible ? 'entering' : 'exiting');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleClose = () => {
		setAnimationState('exiting');
		closeMenu();
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

	const getImages = () =>
		({
			'': '',
			'bg-BG': bgFlag,
			'en-GB': gbFlag,
			'en-US': '',
			'ja-JP': '',
			'cs-CZ': '',
			'da-DK': '',
			'hu-HU': '',
			'pl-PL': '',
			'ro-RO': '',
			'sv-SE': '',
			'fr-CH': '',
			'is-IS': '',
			'no-NO': '',
			'tr-TR': '',
			'en-AU': '',
			'pt-BR': '',
			'en-CA': '',
			'zh-CN': '',
			'zh-HK': '',
			'id-ID': '',
			'he-IL': '',
			'hi-IN': '',
			'ko-KR': '',
			'es-MX': '',
			'ms-MY': '',
			'en-NZ': '',
			'fil-PH': '',
			'en-SG': '',
			'th-TH': '',
			'en-ZA': '',
		}) as Record<Language, string>;

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
				{ALLOWED_LANGUAGES.map((lang, i) => (
					<div key={lang}>
						{i > 0 && (
							<hr className='border-none h-px bg-gray-200 my-2' />
						)}
						<Flag
							lang={lang}
							image={getImages()[lang]}
							onChange={handleClose}
						/>
					</div>
				))}
			</section>
		</aside>
	);
};

export default LanguageMenu;
