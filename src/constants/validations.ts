const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const shipment = {
	email: {
		regex: EMAIL_REGEX,
	},
};

export const product = {
	name: {
		max: 18,
		min: 2,
	},
	description: {
		max: 750,
		min: 10,
	},
	price: {
		max: 1_000_000,
		min: 0.00_000_1,
	},
};

export const user = {
	name: {
		max: 62,
		min: 2,
	},
	password: {
		max: 100,
		min: 6,
	},
	email: {
		regex: EMAIL_REGEX,
	},
};
