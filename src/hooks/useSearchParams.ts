import { useSearchParams as useReactRouterSearchParams } from 'react-router-dom';

const useSearchParams = () => {
	const [searchParams, setSearchParams] = useReactRouterSearchParams();

	const getParam = (name: string) => searchParams.get(name) ?? undefined;

	const setParams = (values: object) =>
		setSearchParams({
			...Object.fromEntries(searchParams),
			...values,
		});

	return { getParam, setParams };
};

export default useSearchParams;
