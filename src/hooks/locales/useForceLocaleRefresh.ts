import { ReactFormExtendedApi } from '@tanstack/react-form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useForceLocaleRefresh = <TFields>(
	form: ReactFormExtendedApi<TFields, undefined>,
) => {
	const { i18n } = useTranslation();
	useEffect(() => {
		form.validate('change');
	}, [i18n.language]);

	return i18n.language;
};

export default useForceLocaleRefresh;
