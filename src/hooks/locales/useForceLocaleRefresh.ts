import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useForceLocaleRefresh = (refresh: VoidFunction) => {
	const { i18n } = useTranslation();
	useEffect(() => {
		refresh();
	}, [i18n.language]);

	return i18n.language;
};

export default useForceLocaleRefresh;
