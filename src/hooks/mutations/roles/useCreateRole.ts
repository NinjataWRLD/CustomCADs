import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/accounts/roles';
import { Request } from '@/api/accounts/roles/resources/create';

const useCreateRole = () =>
	useMutation({
		mutationKey: ['roles', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateRole;
