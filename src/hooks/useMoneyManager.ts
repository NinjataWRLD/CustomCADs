import { useState } from 'react';

interface SetMoneyParams {
	id: string;
	set: (prev: number) => number;
}

export const useMoneyManager = () => {
	const [money, setMoney] = useState<Record<string, number>>({});

	return {
		money: money,
		setMoney: ({ id, set }: SetMoneyParams) =>
			setMoney((prev) => ({
				...prev,
				[id]: set(prev[id] ?? 0),
			})),
	};
};
