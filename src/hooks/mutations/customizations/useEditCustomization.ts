import { useMutation } from '@tanstack/react-query';
import { edit } from '@/api/customizations/customizations';
import { Request } from '@/api/customizations/customizations/resources/edit';

const useEditCustomization = () =>
	useMutation({
		mutationKey: ['customizations', 'edit'],
		mutationFn: async (params: Request) => (await edit(params)).data,
	});

export default useEditCustomization;
