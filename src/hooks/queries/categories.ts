import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/categories/categories/single';
import { all, single } from '@/api/categories/categories';

export const useGetCategories = (enabled?: boolean) =>
	useQuery({
		queryKey: ['categories', 'all'],
		queryFn: async () => (await all()).data,
		enabled,
	});

const useGetCategory = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['categories', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export default useGetCategory;
