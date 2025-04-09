import { useTranslation } from '../useTranslation';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'creator';

export const useUploadProductTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.upload-product`).t;
