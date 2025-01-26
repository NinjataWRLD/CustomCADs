import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/categories/categories';
import { Request } from '@/api/categories/categories/resources/delete';

const useDeleteCategory = () =>
	useMutation({
		mutationKey: ['categories', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteCategory;
