import { useMutation } from '@tanstack/react-query';
import { edit } from '@/api/catalog/tags';
import { Request } from '@/api/catalog/tags/resources/edit';

const useEditTag = () =>
	useMutation({
		mutationKey: ['catalog', 'tags', 'edit'],
		mutationFn: async (params: Request) => (await edit(params)).data,
	});

export default useEditTag;
