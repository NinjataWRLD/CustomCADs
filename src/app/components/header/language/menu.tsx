import { useTranslation } from 'react-i18next';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import gbFlag from '@/assets/images/flags/gb.svg';
import bgFlag from '@/assets/images/flags/bg.svg';
import styles from './styles.module.css';

type LanguageMenuProps = {
	closeMenu: () => void;
};

const LanguageMenu = ({ closeMenu }: LanguageMenuProps) => {
	const { i18n } = useTranslation();
	const tHeader = useHeaderTranslation();

	const handleClick = () => {
		const languages = Object.keys(i18n.options.resources ?? {});
		const index = languages.indexOf(i18n.language);

		const newIndex = index + 1 > languages.length - 1 ? 0 : index + 1;
		i18n.changeLanguage(languages[newIndex]);

		closeMenu();
	};

	return (
		<aside className={styles['language-menu']}>
			<div className={styles.close} onClick={closeMenu}>
				<FontAwesomeIcon icon={faTimes} />
			</div>
			<h3>{tHeader('choose-language')}</h3>
			<section className={styles['language-container']}>
				<div onClick={i18n.language === 'bg' ? handleClick : closeMenu}>
					<img src={gbFlag} width={50} height={50} />
					<span>{tHeader('english')}</span>
				</div>
				<hr />
				<div onClick={i18n.language === 'en' ? handleClick : closeMenu}>
					<img src={bgFlag} width={50} height={50} />
					<span>{tHeader('bulgarian')}</span>
				</div>
			</section>
		</aside>
	);
};

export default LanguageMenu;
