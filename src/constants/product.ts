const validations = {
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

export default validations;
