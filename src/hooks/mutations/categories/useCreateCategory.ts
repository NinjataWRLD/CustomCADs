import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/categories/categories';
import { Request } from '@/api/categories/categories/resources/create';

const useCreateCategory = () =>
	useMutation({
		mutationKey: ['categories', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateCategory;
