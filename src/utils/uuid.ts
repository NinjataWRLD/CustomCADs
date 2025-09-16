type Index = 'first' | 'last' | number;
export const extractSegment = (id: string, index: Index) => {
	const segments = id.split('-');
	switch (index) {
		case 'first':
			return segments[0];
		case 'last':
			return segments[segments.length - 1];
		default:
			return segments[index];
	}
};
