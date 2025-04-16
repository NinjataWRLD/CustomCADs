import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';

const LanguageButton = () => {
	const { i18n } = useTranslation();
	const tHeader = useHeaderTranslation();

	const handleClick = () => {
		const languages = Object.keys(i18n.options.resources ?? {});
		const index = languages.indexOf(i18n.language);

		const newIndex = index + 1 > languages.length - 1 ? 0 : index + 1;
		i18n.changeLanguage(languages[newIndex]);
	};

	return (
		<FontAwesomeIcon
			icon={faGlobe}
			size='2x'
			onClick={handleClick}
			data-tooltip={tHeader('language')}
			style={{ cursor: 'pointer' }}
		/>
	);
};

export default LanguageButton;
