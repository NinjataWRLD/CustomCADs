import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/categories/categories/requests';
import { Request } from '@/api/categories/categories/types/delete';

const useDeleteCategory = () =>
	useMutation({
		mutationKey: ['categories', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteCategory;
