import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/customizations/customizations';
import { Request } from '@/api/customizations/customizations/resources/delete';

const useDeleteCustomization = () =>
	useMutation({
		mutationKey: ['customizations', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteCustomization;
