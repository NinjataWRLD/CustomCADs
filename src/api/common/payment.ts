export interface Request {
	paymentMethodId: string;
}

export interface Response {
	clientSecret: string;
	message: string;
}
