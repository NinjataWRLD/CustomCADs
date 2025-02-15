import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/catalog/tags';
import { Request } from '@/api/catalog/tags/resources/delete';

const useDeleteTag = () =>
	useMutation({
		mutationKey: ['catalog', 'tags', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteTag;
