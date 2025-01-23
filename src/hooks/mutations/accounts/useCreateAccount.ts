import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/accounts/accounts/requests';
import { Request } from '@/api/accounts/accounts/types/create';

const useCreateAccount = () =>
	useMutation({
		mutationKey: ['accounts', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateAccount;
