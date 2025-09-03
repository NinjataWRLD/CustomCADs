export const invertBy = <
	T extends Record<string, Record<K, PropertyKey>>,
	K extends keyof T[keyof T],
>(
	obj: T,
	prop: K,
) => {
	return Object.fromEntries(
		Object.entries(obj).map(([outerKey, innerObj]) => [
			innerObj[prop],
			outerKey,
		]),
	) as Record<T[keyof T][K], keyof T>;
};
