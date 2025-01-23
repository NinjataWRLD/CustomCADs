import { useMutation } from '@tanstack/react-query';
import { edit } from '@/api/categories/categories/requests';
import { Request } from '@/api/categories/categories/types/edit';

const useEditCategory = () =>
	useMutation({
		mutationKey: ['categories', 'edit'],
		mutationFn: async (params: Request) => (await edit(params)).data,
	});

export default useEditCategory;
