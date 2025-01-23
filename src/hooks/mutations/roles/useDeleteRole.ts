import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/accounts/roles/requests';
import { Request } from '@/api/accounts/roles/types/delete';

const useDeleteRole = () =>
	useMutation({
		mutationKey: ['roles', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteRole;
