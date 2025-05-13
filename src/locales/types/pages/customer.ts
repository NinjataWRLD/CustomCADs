export type PagesCustomerShipmentForm = {
	title: string;
	btn: string;
	'go-back': string;
};

export type PagesCustomerCheckoutForm = {
	paid: string;
	processing: string;
	purchase: string;
	check_out: string;
	here: string;
};

export type PagesCustomerPurchasedCarts = {
	title: string;
	'first-column': string;
	'second-column': string;
	'third-column': string;
	'fourth-column': string;
	'items-length'?: undefined;
	'items-length_one': string;
	'items-length_other': string;
	'button-1': string;
	'button-2': string;
};

export type PagesCustomerCartItem = {
	price: string;
	quantity: string;
	'title-1': string;
	'title-2': string;
	'added-at': string;
	'delivery-status': string;
	'final-price-1': string;
	'final-price-2': string;
	'delivery-option-1': string;
	'delivery-option-2': string;
};
