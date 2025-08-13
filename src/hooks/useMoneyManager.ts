import { useState } from 'react';

type SetMoneyParams = {
	id: string;
	set: (prev: number) => number;
};

export const useMoneyManager = () => {
	const [money, setMoney] = useState<Record<string, number>>({});

	return [
		money,
		({ id, set }: SetMoneyParams) =>
			setMoney((prev) => ({
				...prev,
				[id]: set(prev[id] ?? 0),
			})),
	] as const;
};
