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
				className={styles['icon-wrapper']}
				data-tooltip={tHeader('icon-5')}
				ref={langRef}
			>
				<div onClick={openMenu}>
					<FontAwesomeIcon
						icon={faGlobe}
						size='2x'
						data-tooltip={tHeader('language')}
						style={{ cursor: 'pointer' }}
					/>
				</div>
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
