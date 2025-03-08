import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/customizations/customizations';
import { Request } from '@/api/customizations/customizations/resources/create';

const useCreateCustomization = () =>
	useMutation({
		mutationKey: ['customizations', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateCustomization;
