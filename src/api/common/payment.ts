export type Request = {
	paymentMethodId: string;
};

export type Response = {
	clientSecret: string;
	message: string;
};
