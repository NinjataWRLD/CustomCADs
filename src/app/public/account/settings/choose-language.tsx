import { Language, languages } from '@/types/locale';
import * as languageStore from '@/stores/language-store';
import { useLanguageStore } from '@/hooks/stores/useLanguageStore';
import { useLocalesTranslation } from '@/hooks/locales/common/locales';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import StyledSelect from '@/app/components/fields/select';
import { getUserDefaultLanguage } from '@/utils/default-language';

type LanguageOption = { id: string; name: string; value: Language };

const ChooseLanguage = () => {
	const tMyAccount = useMyAccountTranslation();
	const tLocales = useLocalesTranslation();

	const { default: defaultLanguage } = useLanguageStore();
	const options: LanguageOption[] = languages.map((lang) => ({
		id: lang,
		name: tLocales(lang),
		value: lang,
	}));

	const handleChange = (language: Language) => {
		languageStore.setDefault(language);
		languageStore.setCurrent(language);
	};

	return (
		<div className='relative flex items-center gap-8'>
			<h2>{tMyAccount('choose-language')}</h2>
			<StyledSelect
				id='language'
				name='language'
				value={defaultLanguage}
				options={options}
				onChange={handleChange}
				className='max-w-[40%]'
				placeholder={tLocales(getUserDefaultLanguage())}
			/>
		</div>
	);
};

export default ChooseLanguage;
