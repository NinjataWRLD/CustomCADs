import { CommonMessagesPlaceholders, CommonMessagesNotFound } from './messages';
import { CommonStateError } from './state';
import { CommonOthers } from './others';
import { CommonLocales } from './locales';

export type CommonTranslations = {
	'common.messages.placeholders': CommonMessagesPlaceholders;
	'common.messages.not-found': CommonMessagesNotFound;
	'common.state.error': CommonStateError;
	'common.others': CommonOthers;
	'common.locales': CommonLocales;
};
