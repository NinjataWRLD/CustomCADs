import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/accounts/accounts/requests';
import { Request } from '@/api/accounts/accounts/types/delete';

const useDeleteAccount = () =>
	useMutation({
		mutationKey: ['accounts', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteAccount;
