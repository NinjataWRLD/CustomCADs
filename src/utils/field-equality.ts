const fieldEqualityHelper = () => {
	let holder = '';

	const sync = (x: string) => {
		holder = x;
		return true;
	};

	const check = (x: string) => {
		return holder === x;
	};

	return { sync, check };
};

export default fieldEqualityHelper;
