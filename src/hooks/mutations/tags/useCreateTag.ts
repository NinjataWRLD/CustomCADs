import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/catalog/tags';
import { Request } from '@/api/catalog/tags/resources/create';

const useCreateTag = () =>
	useMutation({
		mutationKey: ['catalog', 'tags', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateTag;
