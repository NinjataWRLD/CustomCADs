import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';

const LanguageButton = () => {
	const { i18n } = useTranslation();
	const tHeader = useHeaderTranslation();

	const [language, setLanguage] = useState(i18n.language);
	const languages = Object.keys(i18n.options.resources ?? {});
	let languageIndex = languages.indexOf(language);

	const handleClick = () => {
		if (languageIndex + 1 > languages.length - 1) {
			languageIndex = 0;
		} else languageIndex++;

		setLanguage(languages[languageIndex]);
		localStorage.setItem('language', languages[languageIndex]);
		i18n.changeLanguage(languages[languageIndex]);
	};

	return (
		<FontAwesomeIcon
			icon={faGlobe}
			size='2x'
			onClick={handleClick}
			data-tooltip={tHeader('language')}
		/>
	);
};

export default LanguageButton;
