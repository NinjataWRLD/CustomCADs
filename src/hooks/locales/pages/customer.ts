import { useTranslation } from '../useTranslation';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'customer';

export const useShipmentFormTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.shipment-form`).t;

export const useShipmentsTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.shipments`).t;

export const useCheckoutFormTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.checkout-form`).t;

export const usePurchasedCartsTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.purchased-carts`).t;

export const useCartItemTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.cart-item`).t;
