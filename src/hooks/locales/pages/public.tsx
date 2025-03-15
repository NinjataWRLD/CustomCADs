import useTranslation from '../useTranslation';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'public';

export const useHomeTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.home`).t;

export const useProductTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.product`).t;

export const useCartTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.cart`).t;

export const useEditorTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.editor`).t;
