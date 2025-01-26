import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/accounts/accounts';
import { Request } from '@/api/accounts/accounts/resources/create';

const useCreateAccount = () =>
	useMutation({
		mutationKey: ['accounts', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateAccount;
