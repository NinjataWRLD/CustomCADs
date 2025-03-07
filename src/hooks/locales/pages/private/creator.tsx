import { useTranslation } from 'react-i18next';
import { NAMESPACE } from '../namespace';

const SUB_NAMESPACE = 'private.creator';

export const useUploadProductTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.upload-product`).t;
