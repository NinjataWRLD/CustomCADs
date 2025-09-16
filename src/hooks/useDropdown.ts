import { useState } from 'react';

export const useDropdown = <TDropdown>() => {
	const [dropdown, setDropdown] = useState<TDropdown>();

	return {
		current: dropdown,
		is: (compareTo: TDropdown) => dropdown === compareTo,
		set: (active: boolean, dropdown: TDropdown) =>
			setDropdown(active ? dropdown : undefined),
	};
};
