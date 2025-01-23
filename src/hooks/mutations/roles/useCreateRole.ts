import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/accounts/roles/requests';
import { Request } from '@/api/accounts/roles/types/create';

const useCreateRole = () =>
	useMutation({
		mutationKey: ['roles', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateRole;
