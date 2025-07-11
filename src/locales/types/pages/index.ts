import { PagesCreatorUploadProduct } from './creator';
import {
	PagesCustomerShipmentForm,
	PagesCustomerCheckoutForm,
	PagesCustomerPurchasedCarts,
	PagesCustomerCartItem,
} from './customer';
import {
	PagesGuestForgotPassword,
	PagesGuestLogin,
	PagesGuestPickRole,
	PagesGuestRegister,
	PagesGuestResetPassword,
} from './guest';
import {
	PagesPublicMyAccount,
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
	'pages.customer.cart-item': PagesCustomerCartItem;
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
	'pages.public.my-account': PagesPublicMyAccount;
	'pages.public.services': PagesPublicServicesInfo;
};
