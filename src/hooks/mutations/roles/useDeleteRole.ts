import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/accounts/roles';
import { Request } from '@/api/accounts/roles/resources/delete';

const useDeleteRole = () =>
	useMutation({
		mutationKey: ['roles', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteRole;
