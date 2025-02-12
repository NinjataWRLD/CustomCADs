import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/categories/categories';

const useGetCategories = () =>
	useQuery({
		queryKey: ['categories', 'all'],
		queryFn: async () => (await all()).data,
	});

export default useGetCategories;
