import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import Menu from './menu';
import styles from './styles.module.css';

const Language = () => {
	const tHeader = useHeaderTranslation();
	const [showLangMenu, setShowLangMenu] = useState(false);
	const langRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<div
				className={styles['icon-wrapper']}
				data-tooltip={tHeader('icon-5')}
				ref={langRef}
			>
				<div onClick={() => setShowLangMenu((prev) => !prev)}>
					<FontAwesomeIcon
						icon={faGlobe}
						size='2x'
						data-tooltip={tHeader('language')}
						style={{ cursor: 'pointer' }}
					/>
				</div>
				{showLangMenu && (
					<>
						<div className={styles.blur}></div>
						<Menu closeMenu={() => setShowLangMenu(false)} />
					</>
				)}
			</div>
		</>
	);
};

export default Language;
