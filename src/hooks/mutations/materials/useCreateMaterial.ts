import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/customizations/materials';
import { Request } from '@/api/customizations/materials/resources/create';

const useCreateMaterial = () =>
	useMutation({
		mutationKey: ['materials', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateMaterial;
