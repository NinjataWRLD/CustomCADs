import { CommonTranslations } from './common';
import { ComponentTranslations } from './components';
import { PagesTranslations } from './pages';

export type Translations = CommonTranslations &
	ComponentTranslations &
	PagesTranslations;
