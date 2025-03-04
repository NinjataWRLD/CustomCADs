import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/customizations/materials';
import { Request } from '@/api/customizations/materials/resources/delete';

const useDeleteMaterial = () =>
	useMutation({
		mutationKey: ['materials', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteMaterial;
