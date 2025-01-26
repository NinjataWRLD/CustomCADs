import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/accounts/accounts';
import { Request } from '@/api/accounts/accounts/resources/delete';

const useDeleteAccount = () =>
	useMutation({
		mutationKey: ['accounts', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteAccount;
