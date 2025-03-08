import { useMutation } from '@tanstack/react-query';
import { edit } from '@/api/customizations/materials';
import { Request } from '@/api/customizations/materials/resources/edit';

const useEditMaterial = () =>
	useMutation({
		mutationKey: ['materials', 'edit'],
		mutationFn: async (params: Request) => (await edit(params)).data,
	});

export default useEditMaterial;
