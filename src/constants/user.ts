const validations = {
	name: {
		max: 62,
		min: 2,
	},
	password: {
		max: 100,
		min: 6,
	},
	email: {
		regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+1\.[a-zA-Z]{2,}$/,
	},
};

export default validations;
