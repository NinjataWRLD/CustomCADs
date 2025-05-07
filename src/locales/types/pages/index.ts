import { PagesCreatorUploadProduct } from './creator';
import {
	PagesCustomerShipmentForm,
	PagesCustomerCheckoutForm,
	PagesCustomerPurchasedCarts,
} from './customer';
import {
	PagesGuestForgotPassword,
	PagesGuestLogin,
	PagesGuestPickRole,
	PagesGuestRegister,
	PagesGuestResetPassword,
} from './guest';
import {
	PagesPublicCart,
	PagesPublicEditor,
	PagesPublicHome,
	PagesPublicProduct,
	PagesPublicServicesInfo,
} from './public';

export type PagesTranslations = {
	'pages.customer.shipment-form': PagesCustomerShipmentForm;
	'pages.customer.checkout-form': PagesCustomerCheckoutForm;
	'pages.customer.purchased-carts': PagesCustomerPurchasedCarts;
	'pages.creator.upload-product': PagesCreatorUploadProduct;
	'pages.guest.forgot-password': PagesGuestForgotPassword;
	'pages.guest.login': PagesGuestLogin;
	'pages.guest.pick-role': PagesGuestPickRole;
	'pages.guest.register': PagesGuestRegister;
	'pages.guest.reset-password': PagesGuestResetPassword;
	'pages.public.cart': PagesPublicCart;
	'pages.public.editor': PagesPublicEditor;
	'pages.public.home': PagesPublicHome;
	'pages.public.product': PagesPublicProduct;
	'pages.public.services': PagesPublicServicesInfo;
};
