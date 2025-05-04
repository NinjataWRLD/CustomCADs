import { useTranslation } from '../useTranslation';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'customer';

export const useShipmentFormTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.shipment-form`).t;

export const useCheckoutFormTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.checkout-form`).t;
