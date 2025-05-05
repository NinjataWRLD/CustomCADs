import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import LanguageMenu from './menu';
import styles from '../styles.module.css';

const Language = () => {
	const tHeader = useHeaderTranslation();
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const langRef = useRef<HTMLDivElement>(null);

	const openMenu = () => {
		setIsMounted((prev) => !prev);
		setIsMenuVisible(true);
	};

	const closeMenu = () => {
		setIsMenuVisible(false);
	};

	const handleExited = () => {
		setIsMounted(false);
	};

	return (
		<>
			<div
				ref={langRef}
				className='relative inline-block transition-all duration-100 ease-linear group'
				data-tooltip={tHeader('icon-5')}
			>
				<div onClick={openMenu}>
					<FontAwesomeIcon
						icon={faGlobe}
						size='2x'
						className='cursor-pointer transition-colors duration-200 ease-linear text-white group-hover:text-gray-400'
					/>
				</div>

				<span className='absolute top-[130%] left-1/2 -translate-x-1/2 text-white font-normal whitespace-nowrap text-sm z-10 opacity-0 invisible transform translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'>
					{tHeader('language')}
				</span>
				{isMounted && (
					<LanguageMenu
						isVisible={isMenuVisible}
						closeMenu={closeMenu}
						onExited={handleExited}
					/>
				)}
			</div>
		</>
	);
};

export default Language;
